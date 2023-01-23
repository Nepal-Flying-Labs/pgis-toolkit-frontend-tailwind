import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setBufferAnalysisState: ['payload'],
    setDataInputState: ['payload'],
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
