import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectThemesRequest: ['params'],
    getProjectThemesSuccess: ['payload'],
    getProjectThemesFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
