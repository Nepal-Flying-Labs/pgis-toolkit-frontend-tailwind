import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    setDataInputState: ['payload'],
  },
  { prefix: 'routeAnalysis/' },
);

export default Creators;
