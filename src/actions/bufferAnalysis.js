import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setBufferAnalysisState: ['payload'],
    setDataInputState: ['payload'],
    setResultsState: ['payload'],

    resetBufferAnalysisState: ['payload'],

    applyBufferAnalysisRequest: ['payload'],
    applyBufferAnalysisSuccess: ['payload'],
    applyBufferAnalysisFailure: null,

    checkProcessingStatusSuccess: ['payload'],
    checkProcessingStatusFailure: null,

    handleCheckbox: ['payload'],
  },
  { prefix: 'bufferAnalysis/' },
);

export default Creators;
