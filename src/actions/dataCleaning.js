import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setDataCleaningState: ['payload'],
    setOptimalRouteState: ['payload'],
    setErrorStates: ['payload'],

    checkErrorRequest: ['payload'],
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

    getFeatureGeojsonRequest: ['payload'],
    getFeatureGeojsonSuccess: ['payload'],
    getFeatureGeojsonFailure: null,

    startAnalysisRequest: ['params'],
    startAnalysisSuccess: ['payload'],
    startAnalysisFailure: null,

    resetDataCleaningState: null,

    saveAttributeEdit: ['payload'],

    explodeFeatureRequest: ['payload'],
    explodeFeatureSuccess: ['payload'],
    explodeFeatureFailure: ['payload'],

    validateErrorFixRequest: ['payload'],
    validateErrorFixSuccess: ['payload'],
    validateErrorFixFailure: null,
  },
  { prefix: 'dataCleaning/' },
);

export default Creators;
