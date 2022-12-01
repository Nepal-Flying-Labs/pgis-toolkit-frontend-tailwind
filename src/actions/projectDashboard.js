import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectDetailRequest: ['params'],
    getProjectDetailSuccess: ['payload'],
    getProjectDetailFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
