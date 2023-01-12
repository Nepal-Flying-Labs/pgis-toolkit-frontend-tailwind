import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setRouteAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    handleCheckbox: ['payload'],

    copyDataCleaningStateRequest: null,
    copyDataCleaningStateSuccess: ['payload'],
    copyDataCleaningStateFailure: null,

    applyRouteAnalysisRequest: ['payload'],
    applyRouteAnalysisSuccess: ['payload'],
    applyRouteAnalysisFailure: null,

    checkProcessingStatusRequest: ['params'],
    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
