import removeObjectKeys from '@Utils/removeObjectKeys';
import { createSelector } from 'reselect';

export const errorFeaturesDataSelector = state =>
  state.analysis.errorFeaturesData;

export const errorFeaturesMapStateSelector = createSelector(
  [errorFeaturesDataSelector],
  errorFeaturesData => {
    const errorFeatures = removeObjectKeys(errorFeaturesData || {}, [
      'features',
      'layer_id',
    ]);
    return Object.entries(errorFeatures)
      .map(([key, value]) => ({
        type: key,
        features: value,
      }))
      .filter(item => item.features.length);
  },
);
