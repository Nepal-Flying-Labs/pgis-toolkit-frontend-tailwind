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
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
