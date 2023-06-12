import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setRouteAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],
    handleCheckbox: ['payload'],
    handleRouteCheckbox: ['payload'],
    resetRouteAnalysisState: ['payload'],
    handleObstaclesToggle: ['payload'],

    applyRouteAnalysisRequest: ['payload'],
    applyRouteAnalysisSuccess: ['payload'],
    applyRouteAnalysisFailure: null,

    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    getRoutePopupDataRequest: ['payload'],
    getRoutePopupDataSuccess: ['payload'],
    getRoutePopupDataFailure: null,

    getAnalysisDataRequest: ['params'],
    getAnalysisDataSuccess: ['payload'],
    getAnalysisDataFailure: null,

    saveRouteLayerRequest: ['payload'],
    saveRouteLayerSuccess: ['payload'],
    saveRouteLayerFailure: null,

    getSelectedLayerFeatureRequest: ['payload'],
    getSelectedLayerFeatureSuccess: ['payload'],
    getSelectedLayerFeatureFailure: ['payload'],

    deleteRouteResult: ['payload'],

    getAnalysisResultListSuccess: ['payload'],
    getAnalysisResultListFailure: [null],

    getAnalysisResultDetailSuccess: ['payload'],
    getAnalysisResultDetailFailure: null,

    // optimum-route-analysis-download
    downloadOptimumRouteAnalysisRequest: ['params'],
    downloadOptimumRouteAnalysisSuccess: ['payload'],
    downloadOptimumRouteAnalysisFailure: ['payload'],

    deleteOptimumRouteResultRequest: ['id', 'payload'],
    deleteOptimumRouteResultSuccess: ['payload'],
    deleteOptimumRouteResultFailure: null,
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
