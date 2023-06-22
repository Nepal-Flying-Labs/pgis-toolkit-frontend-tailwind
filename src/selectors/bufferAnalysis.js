import { createSelector } from 'reselect';

const analysisResultDataSelector = state =>
  state.bufferAnalysis.results.analysisResults;
const selectedResultIdSelector = state =>
  state.bufferAnalysis.results.selectedResultId;
const selectedLayerAttributeFieldsSelector = state =>
  state.bufferAnalysis.selectedLayerAttributeFields;

export const chartDataSelector = createSelector(
  [analysisResultDataSelector, selectedResultIdSelector],
  (analysisResults, selectedResultId) => {
    const totalPoiCountChartData = [];
    const selectedResult = analysisResults.find(
      result => result.id === selectedResultId,
    );
    const selectedAreas = selectedResult.buffer_areas.filter(
      area => area.checked,
    );

    const originCount = selectedAreas?.reduce(
      (total, item) => total + item.origin?.length,
      0,
    );

    selectedAreas.forEach(bufarea => {
      bufarea.poi.forEach(poiArea => {
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

export const selectedRadiusColumnSelector = createSelector(
  selectedLayerAttributeFieldsSelector,
  selectedLayerAttributeFields =>
    selectedLayerAttributeFields.find(item => item.checked),
);
