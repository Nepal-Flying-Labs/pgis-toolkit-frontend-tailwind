import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectThemesRequest: ['params'],
    getProjectThemesSuccess: ['payload'],
    getProjectThemesFailure: null,

    getProjectThemeLayersRequest: ['params'],
    getProjectThemeLayersSuccess: ['payload'],
    getProjectThemeLayersFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
