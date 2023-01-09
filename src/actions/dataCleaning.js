import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setAnalysisState: ['payload'],
    setOptimalRouteState: ['payload'],
    setErrorStates: ['payload'],

    checkErrorRequest: ['params'],
    checkErrorSuccess: ['payload'],
    checkErrorFailure: null,

    setErrorCheckingStatus: ['payload'],
    handleAutofixCheckbox: ['payload'],

    autoFixErrorRequest: ['params'],
    autoFixErrorSuccess: ['payload'],
    autoFixErrorFailure: null,

    getErrorFeaturesRequest: ['params'],
    getErrorFeaturesSuccess: ['payload'],
    getErrorFeaturesFailure: null,

    setManualFixState: ['payload'],

    getLayerAttributeFieldsRequest: ['params'],
    getLayerAttributeFieldsSuccess: ['payload'],
    getLayerAttributeFieldsFailure: null,

    updateFeatureCollectionRequest: ['id', 'payload'],
    updateFeatureCollectionSuccess: ['payload'],
    updateFeatureCollectionFailure: null,

    deleteFeatureRequest: ['id'],
    deleteFeatureSuccess: ['payload'],
    deleteFeatureFailure: null,

    deleteSelectedFeaturesRequest: null,
    deleteSelectedFeaturesSuccess: ['payload'],
    deleteSelectedFeaturesFailure: null,

    handleErrorCheckbox: ['payload'],
  },
  { prefix: 'dataCleaning/' },
);

export default Creators;
