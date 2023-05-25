import { createSelector } from 'reselect';
import { isEmpty } from '@Utils/commonUtils';

export const analysisResultsSelector = state =>
  state.routeAnalysis.results.analysisResults;
export const routePopupDataSelector = state =>
  state.routeAnalysis.routePopupData;
export const selectedRoadNetworkIdSelector = state =>
  state.routeAnalysis.selectedRoadNetworkId;
export const layersSelector = state => state.analysis.layers;

export const obstacleLayersSelector = createSelector(
  [analysisResultsSelector, routePopupDataSelector],
  (analysisResults, routePopupData) => {
    let checkedObstacles = [];
    analysisResults?.results?.forEach(result => {
      if (!result.checked) return;
      result.routes.forEach(route => {
        if (!route.checked) return;
        route.data.forEach(item => {
          if (!item.checked) return;
          item.obstacles.forEach(obstacle => {
            if (isEmpty(obstacle.feature_mirror_ids)) return;
            const alreadyHasLayer = checkedObstacles.some(
              i => i.layer_id === obstacle.layer_id,
            );
            if (alreadyHasLayer) {
              checkedObstacles = checkedObstacles.map(i =>
                i.layer_id === obstacle.layer_id
                  ? {
                      ...obstacle,
                      feature_mirror_ids: [
                        ...new Set([
                          ...i.feature_mirror_ids,
                          ...obstacle.feature_mirror_ids,
                        ]),
                      ],
                    }
                  : { ...obstacle },
              );
            } else {
              if (
                routePopupData &&
                !routePopupData.obstacles.find(
                  i => i.layer_id === obstacle.layer_id,
                )?.checked
              )
                return;
              checkedObstacles = [...checkedObstacles, obstacle];
            }
          });
        });
      });
    });
    return checkedObstacles;
  },
);

export const roadNetworkLayerSelector = createSelector(
  [selectedRoadNetworkIdSelector, layersSelector],
  (selectedRoadNetworkId, layers) => {
    if (!layers) return null;
    const allLayers = Object.values(layers).flat();
    const roadNetworkLayer = allLayers.find(
      item => item.id === selectedRoadNetworkId,
    );
    return roadNetworkLayer;
  },
);
