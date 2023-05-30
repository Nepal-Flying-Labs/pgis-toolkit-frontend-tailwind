import { createSelector } from 'reselect';

export const analysisResultDataSelector = state =>
  state.proximityAnalysis.results.analysisResults;

export const selectedResultIdSelector = state =>
  state.proximityAnalysis.results.selectedResultId;

export const chartDataSelector = createSelector(
  [analysisResultDataSelector, selectedResultIdSelector],
  (analysisResults, selectedResultId) => {
    const totalPoiCountChartData = [];
    const selectedResult = analysisResults.results.find(
      result => result.id === selectedResultId,
    );
    const selectedAreas = selectedResult.proximity_areas.filter(
      area => area.checked,
    );

    const originCount = selectedAreas?.reduce(
      (total, item) => total + item.origin?.length,
      0,
    );

    selectedAreas.forEach(proxarea => {
      proxarea.poi.forEach(poiArea => {
        const existingLayerCheck = totalPoiCountChartData.findIndex(
          layer => layer.name === poiArea.layer_name,
        );
        if (existingLayerCheck !== -1) {
          totalPoiCountChartData[existingLayerCheck].count +=
            poiArea.feature_mirror_ids.length;
        } else {
          totalPoiCountChartData.push({
            name: poiArea.layer_name,
            count: poiArea.feature_mirror_ids.length,
          });
        }
      });
    });

    return { poiChartData: totalPoiCountChartData, originCount };
  },
);
