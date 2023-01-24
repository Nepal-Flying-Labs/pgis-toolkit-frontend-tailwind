import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    checkProcessingStatusRequest: ['payload'],
    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    setAnalysisState: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
