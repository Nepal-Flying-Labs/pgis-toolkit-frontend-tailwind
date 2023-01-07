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
    handleAutofixCheckbox: ['payload'],

    autoFixErrorRequest: ['params'],
    autoFixErrorSuccess: ['payload'],
    autoFixErrorFailure: null,

    getErrorFeaturesRequest: ['params'],
    getErrorFeaturesSuccess: ['payload'],
    getErrorFeaturesFailure: null,

    setManualFixState: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
