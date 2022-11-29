import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  themes: [],
  layers: null,
  zoomToLayerId: null,
  selectedProjectTheme: null,
  popupData: {
    id: 104969,
    layer_id: 201,
    fid: 5,
    county: 'Kakamega',
    country: 'Kenya',
    scpcode: 'KEN_3_207',
    ctypcode: 'KEN_2_37',
    dhis2_id: 'K7mZpm8COh7',
    province: 'Western',
    provpcode: 'KEN_1_6',
    subcounty: 'Butere Sub County',
    layer: 'default',
  },
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

const setZoomToLayerId = (state, action) => ({
  ...state,
  zoomToLayerId: action.payload,
});

const setSelectedProjectTheme = (state, action) => ({
  ...state,
  selectedProjectTheme: action.payload,
});

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.SET_ZOOM_TO_LAYER_ID]: setZoomToLayerId,
  [Types.SET_SELECTED_PROJECT_THEME]: setSelectedProjectTheme,
});

export default projectDashboardReducer;
