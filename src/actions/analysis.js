import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    checkProcessingStatusRequest: ['payload'],
    setAnalysisState: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
