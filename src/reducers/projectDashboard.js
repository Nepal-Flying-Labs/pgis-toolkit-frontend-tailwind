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
    [theme]: data.map(item => ({ ...item, checked: false })),
  };
  return {
    ...state,
    layers,
  };
};

const handleCheckbox = (state, action) => {
  const { layerId, themeId, checked } = action.payload;
  const layers = {
    ...state.layers,
    [themeId]: state.layers[themeId].map(item =>
      item.id === layerId ? { ...item, checked } : { ...item },
    ),
  };

  return {
    ...state,
    layers,
  };
};

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
});

export default projectDashboardReducer;
