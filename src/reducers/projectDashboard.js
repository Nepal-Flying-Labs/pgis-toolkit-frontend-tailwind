import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  themes: [],
  layers: null,
};

const getProjectThemesSuccess = (state, action) => ({
  ...state,
  themes: action.payload,
});

const getProjectThemeLayersSuccess = (state, action) => {
  const { data, theme } = action.payload;
  const layers = {
    ...state.layers,
    [theme]: data,
  };
  return {
    ...state,
    layers,
  };
};

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
});

export default projectDashboardReducer;
