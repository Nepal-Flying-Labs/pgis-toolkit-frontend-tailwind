import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setProximityAnalysisState: ['payload'],
    setFilterState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],

    resetProximityAnalysisState: ['payload'],

    applyProximityAnalysisRequest: ['payload'],
    applyProximityAnalysisSuccess: ['payload'],
    applyProximityAnalysisFailure: null,

    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    handleCheckbox: ['payload'],

    handleRouteCheckbox: ['payload'],

    setPopupActiveTab: ['payload'],

    copyFeaturesRequest: ['payload'],
    copyFeaturesSuccess: ['payload'],
    copyFeaturesFailure: ['payload'],

    getDetailsCategoryRequest: ['params'],
    getDetailsCategorySuccess: ['payload'],
    getDetailsCategoryFailure: ['payload'],

    getDetailsChartRequest: ['params'],
    getDetailsChartSuccess: ['payload'],
    getDetailsChartFailure: ['payload'],

    getAnalysisDataRequest: ['params'],
    getAnalysisDataSuccess: ['payload'],
    getAnalysisDataFailure: null,

    getSelectedLayerFeatureRequest: ['payload'],
    getSelectedLayerFeatureSuccess: ['payload'],
    getSelectedLayerFeatureFailure: ['payload'],

    saveProximityLayerRequest: ['payload'],
    saveProximityLayerSuccess: ['payload'],
    saveProximityLayerFailure: null,

    deleteProximityResult: ['payload'],

    getFeatureCollectionRequest: ['params'],
    getFeatureCollectionSuccess: ['payload'],
    getFeatureCollectionFailure: null,
  },
  { prefix: 'proximityAnalysis/' },
);

export default Creators;
