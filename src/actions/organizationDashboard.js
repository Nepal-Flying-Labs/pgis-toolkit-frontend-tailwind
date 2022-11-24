import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectsRequest: ['params'],
    getProjectsSuccess: ['payload'],
    getProjectsFailure: null,
  },
  { prefix: 'organizationDashboard/' },
);

export default Creators;
