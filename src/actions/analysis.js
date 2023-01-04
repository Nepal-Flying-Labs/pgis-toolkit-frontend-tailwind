import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setAnalysisState: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
