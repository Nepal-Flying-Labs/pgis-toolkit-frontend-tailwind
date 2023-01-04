import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setAnalysisState: ['payload'],
    setOptimalRouteState: ['payload'],
    setErrorStates: ['payload'],

    checkErrorRequest: ['params'],
    checkErrorSuccess: ['payload'],
    checkErrorFailure: null,

    setErrorCheckingStatus: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
