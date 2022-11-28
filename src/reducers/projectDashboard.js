import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  themes: [],
};

const getProjectThemesSuccess = (state, action) => ({
  ...state,
  themes: action.payload,
});

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
});

export default projectDashboardReducer;
