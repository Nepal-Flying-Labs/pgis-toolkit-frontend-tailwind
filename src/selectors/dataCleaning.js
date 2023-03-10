import { createSelector } from 'reselect';
import { checkErrorData } from '@src/constants/analysis';
import removeObjectKeys from '@Utils/removeObjectKeys';

const errorFeaturesDataSelector = state => state.dataCleaning.errorFeaturesData;
const layerAttributesFieldsSelector = state =>
  state.dataCleaning.manualFix.layerAttributesFields;
const selectedErrorSelector = state =>
  state.dataCleaning.manualFix.selectedError;

export const errorFeaturesMapStateSelector = createSelector(
  [errorFeaturesDataSelector],
  errorFeaturesData => {
    const errorFeatures = removeObjectKeys(errorFeaturesData || {}, [
      'features',
      'layer_id',
    ]);
    return Object.entries(errorFeatures).map(([key, value]) => ({
      type: key,
      label:
        checkErrorData.find(
          item => item.id === key || item.alternativeId === key,
        )?.label || key,
      features: value,
    }));
  },
);

export const totalErrorsSelector = createSelector(
  errorFeaturesMapStateSelector,
  errorFeaturesMapState =>
    errorFeaturesMapState.reduce((sum, item) => sum + item.features.length, 0),
);

export const individualAttributeDataSelector = createSelector(
  [selectedErrorSelector, layerAttributesFieldsSelector],
  (selectedError, layerAttributesFields) =>
    layerAttributesFields.map(item => ({
      ...item,
      value: selectedError?.attributes?.[item.name] || '',
    })),
);

export const checkedFeatureIdsSelector = createSelector(
  errorFeaturesMapStateSelector,
  errorFeaturesMapState =>
    errorFeaturesMapState.reduce((arr, item) => {
      const arrx = [];
      item.features.forEach(feat => {
        if (feat.children) {
          feat.children.forEach(i => {
            if (!i.checked) return;
            arrx.push(i.id);
          });
        }
        if (!feat.checked) return;
        arrx.push(feat.id);
      });
      return [...arr, ...arrx];
    }, []),
);
