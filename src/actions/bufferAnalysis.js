import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setBufferAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],

    resetBufferAnalysisState: ['payload'],

    applyBufferAnalysisRequest: ['payload'],
    applyBufferAnalysisSuccess: ['payload'],
    applyBufferAnalysisFailure: null,

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

    saveBufferLayerRequest: ['payload'],
    saveBufferLayerSuccess: ['payload'],
    saveBufferLayerFailure: null,

    deleteBufferResult: ['payload'],
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
