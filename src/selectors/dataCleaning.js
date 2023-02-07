import removeObjectKeys from '@Utils/removeObjectKeys';
import { createSelector } from 'reselect';

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
