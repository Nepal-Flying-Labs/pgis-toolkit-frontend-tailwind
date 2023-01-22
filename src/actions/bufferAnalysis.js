import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setBufferAnalysisState: ['payload'],
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
