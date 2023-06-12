import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setBufferAnalysisState: ['payload'],
    setFilterState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],

    resetBufferAnalysisState: ['payload'],

    applyBufferAnalysisRequest: ['payload'],
    applyBufferAnalysisSuccess: ['payload'],
    applyBufferAnalysisFailure: null,

    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    handleCheckbox: ['payload'],

    handleBufferCheckbox: ['payload'],

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

    getFeatureCollectionRequest: ['params'],
    getFeatureCollectionSuccess: ['payload'],
    getFeatureCollectionFailure: null,

    getAnalysisResultListSuccess: ['payload'],
    getAnalysisResultListFailure: [null],

    getAnalysisResultDetailSuccess: ['payload'],
    getAnalysisResultDetailFailure: null,

    // buffer-analysis-download
    downloadBufferAnalysisRequest: ['params'],
    downloadBufferAnalysisSuccess: ['payload'],
    downloadBufferAnalysisFailure: ['payload'],

    deleteBufferResultRequest: ['id', 'payload'],
    deleteBufferResultSuccess: ['payload'],
    deleteBufferResultFailure: null,
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
