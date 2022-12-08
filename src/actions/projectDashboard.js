import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectDetailRequest: ['params'],
    getProjectDetailSuccess: ['payload'],
    getProjectDetailFailure: null,

    getProjectLayersRequest: ['params'],
    getProjectLayersSuccess: ['payload'],
    getProjectLayersFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
