import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

const initialState = {
  analysisTaskId: null,
  analysisId: null,
  themes: null, // []
  layers: null, // {}
  mapSettings: {
    layerOrder: [],
    checkedLayers: [],
  },
  searchText: '',
  zoomToLayerId: null,
  projectGeojson: null,
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const getProjectThemesSuccess = (state, action) => ({
  ...state,
  themes: action.payload,
});

const getProjectThemeLayersSuccess = (state, action) => {
  const { data: layerData, theme } = action.payload;
  const projectAreaLayerId = !state.projectAreaLayerId
    ? layerData.find(item => item.name === 'Boundary')?.id || null
    : state.projectAreaLayerId;
  const data = layerData.filter(item => item.upload_status === 'successful');
  const notPresentLayers = data
    .filter(item => !state.mapSettings.layerOrder.includes(item.id))
    .map(item => item.id);
  const layerOrder = [...notPresentLayers, ...state.mapSettings.layerOrder];
  const layers = {
    ...state.layers,
    [theme]: data.map(item => ({
      ...item,
      theme,
      checked:
        item.id === projectAreaLayerId
          ? true
          : state.mapSettings.checkedLayers.includes(item.id),
      style: {
        ...defaultStyles,
        ...item.style,
        geometryType: item.geom_type,
        icon: item.icon
          ? {
              id: 1,
              url: item.icon,
              scale: item.style?.icon?.scale || 0.9,
            }
          : {},
      },
    })),
  };
  return {
    ...state,
    layers,
    mapSettings: {
      ...state.mapSettings,
      layerOrder,
    },
    projectAreaLayerId,
  };
};

const handleLayerCheckbox = (state, action) => {
  const { layerId, themeId, checked } = action.payload;
  const layers = {
    ...state.layers,
    [themeId]: state.layers[themeId].map(item =>
      item.id === layerId ? { ...item, checked } : { ...item },
    ),
  };
  const mapSettings = {
    ...state.mapSettings,
    checkedLayers: checked
      ? [...new Set([...state.mapSettings.checkedLayers, layerId])]
      : state.mapSettings.checkedLayers.filter(id => id !== layerId),
  };

  return {
    ...state,
    layers,
    mapSettings,
  };
};

const setZoomToLayerId = (state, action) => ({
  ...state,
  zoomToLayerId: action.payload,
});

const getProjectGeojsonSuccess = (state, action) => ({
  ...state,
  projectGeojson: action.payload,
});

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
  [Types.HANDLE_LAYER_CHECKBOX]: handleLayerCheckbox,
  [Types.SET_ZOOM_TO_LAYER_ID]: setZoomToLayerId,
  [Types.GET_PROJECT_GEOJSON_SUCCESS]: getProjectGeojsonSuccess,
});

export default analysisReducer;
