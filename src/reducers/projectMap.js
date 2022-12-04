import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectMap';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

const initialState = {
  themes: [],
  layers: null,
  zoomToLayerId: null,
  selectedProjectTheme: null,
  popupData: {},
  selectedLayer: null,
  hideSidebar: false,
};

const getProjectThemesSuccess = (state, action) => ({
  ...state,
  themes: action.payload,
});

const getProjectThemeLayersSuccess = (state, action) => {
  const { data, theme } = action.payload;
  const layers = {
    ...state.layers,
    [theme]: data.map(item => ({
      ...item,
      checked: false,
      style: {
        ...defaultStyles,
        ...item.style,
        geometryType: item.geom_type,
        icon: {
          id: 1,
          url: item.icon,
        },
      },
    })),
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

const getMapPopupDataSuccess = (state, action) => ({
  ...state,
  popupData: action.payload,
});

const setSelectedLayer = (state, action) => ({
  ...state,
  selectedLayer: action.payload || null,
});

const handleStyleInput = (state, action) => {
  const {
    payload: { name, value },
  } = action;
  const selectedLayer = {
    ...state.selectedLayer,
    style: {
      ...state.selectedLayer.style,
      [name]: value,
    },
  };
  return {
    ...state,
    selectedLayer,
  };
};

const updateLayerSuccess = (state, action) => {
  const { responseData, payload } = action.payload;
  const { theme } = responseData;
  const { style, name } = payload;
  const layers = {
    ...state.layers,
    [theme]: state.layers[theme].map(item =>
      item.id === responseData.id ? { ...item, style, name } : { ...item },
    ),
  };
  return {
    ...state,
    layers,
    selectedLayer: null,
  };
};

const toggleSidebar = state => ({
  ...state,
  hideSidebar: !state.hideSidebar,
});

const uploadIconSuccess = (state, action) => {
  const { id: layerId, theme, icon } = action.payload;
  const layers = {
    ...state.layers,
    [theme]: state.layers[theme].map(item =>
      item.id === layerId
        ? {
            ...item,
            style: {
              ...item.style,
              icon: { ...item.style.icon, id: 1, url: icon },
            },
          }
        : {
            ...item,
          },
    ),
  };
  const selectedLayer = {
    ...state.selectedLayer,
    style: {
      ...state.selectedLayer.style,
      icon: { ...state.selectedLayer.style.icon, id: 1, url: icon },
    },
  };
  return {
    ...state,
    layers,
    selectedLayer,
  };
};

const deleteIconSuccess = (state, action) => {
  console.log(action.payload, 'payloadx');
  const { id: layerId, theme } = action.payload;
  const layers = {
    ...state.layers,
    [theme]: state.layers[theme].map(item =>
      item.id === layerId
        ? {
            ...item,
            style: {
              ...item.style,
              icon: {},
            },
          }
        : {
            ...item,
          },
    ),
  };
  const selectedLayer = {
    ...state.selectedLayer,
    style: {
      ...state.selectedLayer.style,
      icon: {},
    },
  };
  return {
    ...state,
    layers,
    selectedLayer,
  };
};

const projectMapReducer = createReducer(initialState, {
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.SET_ZOOM_TO_LAYER_ID]: setZoomToLayerId,
  [Types.SET_SELECTED_PROJECT_THEME]: setSelectedProjectTheme,
  [Types.GET_MAP_POPUP_DATA_SUCCESS]: getMapPopupDataSuccess,
  [Types.SET_SELECTED_LAYER]: setSelectedLayer,
  [Types.HANDLE_STYLE_INPUT]: handleStyleInput,
  [Types.UPDATE_LAYER_SUCCESS]: updateLayerSuccess,
  [Types.TOGGLE_SIDEBAR]: toggleSidebar,
  [Types.UPLOAD_ICON_SUCCESS]: uploadIconSuccess,
  [Types.DELETE_ICON_SUCCESS]: deleteIconSuccess,
});

export default projectMapReducer;
