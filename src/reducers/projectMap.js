import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectMap';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { arrayMove } from '@dnd-kit/sortable';
import { isEmpty } from '@Utils/commonUtils';

const initialState = {
  themes: [],
  layers: null,
  zoomToLayerId: null,
  selectedProjectTheme: null,
  popupData: {},
  selectedLayer: null,
  deleteLayer: null,
  hideSidebar: false,
  sidebarContent: '',
  layerOrder: [],
  searchText: '',
};

const getProjectThemesSuccess = (state, action) => ({
  ...state,
  themes: action.payload,
});

const getProjectThemeLayersSuccess = (state, action) => {
  const { data, theme } = action.payload;
  const layerOrder = !isEmpty(state.layerOrder)
    ? state.layerOrder
    : data.map(item => item.id);
  const layers = {
    ...state.layers,
    [theme]: data.map(item => ({
      ...item,
      theme,
      checked: false,
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
    layerOrder,
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

const setDeleteLayer = (state, action) => ({
  ...state,
  deleteLayer: action.payload || null,
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

const handleIconInput = (state, action) => {
  const {
    payload: { name, value },
  } = action;
  const selectedLayer = {
    ...state.selectedLayer,
    style: {
      ...state.selectedLayer.style,
      icon: {
        ...state.selectedLayer.style.icon,
        [name]: value,
      },
    },
  };
  return {
    ...state,
    selectedLayer,
  };
};

const deleteLayerSuccess = (state, action) => {
  const { theme, id: layerId } = action.payload;
  const layers = {
    ...state.layers,
    [theme]: state.layers[theme].filter(item => item.id !== layerId),
  };
  return {
    ...state,
    layers,
    deleteLayer: null,
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
              icon: { ...item.style.icon, id: 1, url: icon, scale: 0.9 },
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
      icon: { ...state.selectedLayer.style.icon, id: 1, url: icon, scale: 0.9 },
    },
  };
  return {
    ...state,
    layers,
    selectedLayer,
  };
};

const deleteIconSuccess = (state, action) => {
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

const setSidebarContent = (state, action) => {
  return {
    ...state,
    sidebarContent: action.payload || '',
  };
};

const handleLayerSort = (state, action) => {
  const {
    payload: { active, over },
  } = action;
  const { layerOrder } = state;
  const oldIndex = layerOrder.findIndex(id => id === active.id);
  const newIndex = layerOrder.findIndex(id => id === over.id);
  const sortedLayerOrder = arrayMove(layerOrder, oldIndex, newIndex);
  return {
    ...state,
    layerOrder: sortedLayerOrder,
  };
};

const setSearchText = (state, action) => {
  return {
    ...state,
    searchText: action.payload,
  };
};

const setMapConfig = (state, action) => {
  return {
    ...state,
    layerOrder: action.payload?.layerOrder || initialState.layerOrder,
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
  [Types.SET_DELETE_LAYER]: setDeleteLayer,
  [Types.HANDLE_STYLE_INPUT]: handleStyleInput,
  [Types.HANDLE_ICON_INPUT]: handleIconInput,
  [Types.UPDATE_LAYER_SUCCESS]: updateLayerSuccess,
  [Types.DELETE_LAYER_SUCCESS]: deleteLayerSuccess,
  [Types.TOGGLE_SIDEBAR]: toggleSidebar,
  [Types.UPLOAD_ICON_SUCCESS]: uploadIconSuccess,
  [Types.DELETE_ICON_SUCCESS]: deleteIconSuccess,
  [Types.SET_SIDEBAR_CONTENT]: setSidebarContent,
  [Types.HANDLE_LAYER_SORT]: handleLayerSort,
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.SET_MAP_CONFIG]: setMapConfig,
});

export default projectMapReducer;
