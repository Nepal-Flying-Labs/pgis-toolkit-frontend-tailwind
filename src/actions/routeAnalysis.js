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

    checkProcessingStatusRequest: ['payload'],
    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    getRoutePopupDataRequest: ['payload'],
    getRoutePopupDataSuccess: ['payload'],
    getRoutePopupDataFailure: null,

    getAnalysisDataRequest: ['params'],
    getAnalysisDataSuccess: ['payload'],
    getAnalysisDataFailure: null,
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
