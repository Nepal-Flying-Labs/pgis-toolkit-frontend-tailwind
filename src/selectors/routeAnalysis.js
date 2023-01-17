import { createSelector } from 'reselect';
import { isEmpty } from '@Utils/commonUtils';

export const analysisResultsSelector = state =>
  state.routeAnalysis.results.analysisResults;

export const obstacleLayersSelector = createSelector(
  [analysisResultsSelector],
  analysisResults => {
    let checkedObstacles = [];
    analysisResults.forEach(result => {
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
              checkedObstacles.push(obstacle);
            }
          });
        });
      });
    });
    return checkedObstacles;
  },
);
