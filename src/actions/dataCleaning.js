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

    splitFeatureRequest: ['id', 'payload'],
    splitFeatureSuccess: ['payload'],
    splitFeatureFailure: null,

    deleteFeatureRequest: ['id'],
    deleteFeatureSuccess: ['payload'],
    deleteFeatureFailure: null,

    deleteSelectedFeaturesRequest: null,
    deleteSelectedFeaturesSuccess: ['payload'],
    deleteSelectedFeaturesFailure: null,

    handleErrorCheckbox: ['payload'],

    getFeaturesGeojsonRequest: ['payload'],
    getFeaturesGeojsonSuccess: ['payload'],
    getFeaturesGeojsonFailure: null,

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

    getSelectedFeatureAttributesRequest: ['payload'],
    getSelectedFeatureAttributesSuccess: ['payload'],
    getSelectedFeatureAttributesFailure: null,

    resetManualFixState: null,

    getFeatureGeojsonRequest: ['payload'],
    getFeatureGeojsonSuccess: ['payload'],
    getFeatureGeojsonFailure: null,
  },
  { prefix: 'dataCleaning/' },
);

export default Creators;
