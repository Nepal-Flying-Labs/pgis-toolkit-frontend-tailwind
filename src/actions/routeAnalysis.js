import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setRouteAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    handleCheckbox: ['payload'],

    copyDataCleaningStateRequest: null,
    copyDataCleaningStateSuccess: ['payload'],
    copyDataCleaningStateFailure: null,
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
