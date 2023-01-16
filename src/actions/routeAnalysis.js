import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setRouteAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],
    handleCheckbox: ['payload'],
    handleRouteCheckbox: ['payload'],
    resetRouteAnalysisState: ['payload'],

    applyRouteAnalysisRequest: ['payload'],
    applyRouteAnalysisSuccess: ['payload'],
    applyRouteAnalysisFailure: null,

    checkProcessingStatusRequest: ['payload'],
    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    getRoutePopupDataRequest: ['payload'],
    getRoutePopupDataSuccess: ['payload'],
    getRoutePopupDataFailure: null,
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
