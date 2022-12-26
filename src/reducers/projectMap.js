import { createReducer } from 'reduxsauce';
import { parse } from 'wkt';
import { Types } from '@Actions/projectMap';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

const initialState = {
  themes: null, // []
  layers: null, // {}
  zoomToLayerId: null,
  selectedProjectTheme: null,
  popupData: {},
  selectedLayer: null,
  deleteLayer: null,
  hideSidebar: false,
  mapSettings: {
    layerOrder: [],
    checkedLayers: [],
  },
  searchText: '',
  toggleMapExport: false,
  addFeatureTo: null,
  featureGeojson: null, // feature geojson for edit
  selectedLayerForEdit: null,
  sidebarContent: '', // 'layer-order', 'edit-style', 'edit-feature', 'add-feature'
  individualAttributeData: [],
  drawType: null,
  drawnFeatureWkt: null,
  refreshLayerId: null,
  layerAttributes: null,
  modifiedFeatureGeojson: null,
  editFeatureId: null,
  isFeatureModified: false,
  projectGeojson: null,
  projectAreaLayerId: null,
  dataQuery: {
    fields: null,
    values: null,
  },
};

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

const handleCheckbox = (state, action) => {
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
  const { selectedLayer, sidebarContent } = initialState;
  return {
    ...state,
    layers,
    selectedLayer,
    sidebarContent,
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

const setSidebarContent = (state, action) => ({
  ...state,
  sidebarContent: action.payload || '',
});

const setSearchText = (state, action) => ({
  ...state,
  searchText: action.payload,
});

const setMapConfig = (state, action) => ({
  ...state,
  mapSettings: {
    ...state.mapSettings,
    layerOrder:
      action.payload?.layerOrder || initialState.mapSettings.layerOrder,
    checkedLayers:
      action.payload?.checkedLayers || initialState.mapSettings.checkedLayers,
  },
});

const setProjectMapState = (state, action) => ({
  ...state,
  ...action.payload,
});

const getLayerAttributeFieldsSuccess = (state, action) => {
  const { layerAttributes } = state;
  const individualAttributeData = action.payload.map(item => ({
    ...item,
    value: layerAttributes?.[`${item.name}`] || '',
  }));
  return {
    ...state,
    individualAttributeData,
  };
};

const postNewLayerFeatureSuccess = (state, action) => {
  const refreshLayerId = action.payload.layer;
  const {
    sidebarContent,
    drawType,
    selectedLayer,
    individualAttributeData,
    drawnFeatureWkt,
  } = initialState;
  return {
    ...state,
    refreshLayerId,
    sidebarContent,
    drawType,
    selectedLayer,
    individualAttributeData,
    drawnFeatureWkt,
  };
};

const getFeatureCollectionSuccess = (state, action) => {
  const { geometry, attributes, id: featureId } = action.payload;
  const wktString = geometry.split(';')[1];
  const featureGeojson = parse(wktString);
  return {
    ...state,
    featureGeojson,
    modifiedFeatureGeojson: featureGeojson,
    editFeatureId: featureId,
    sidebarContent: 'edit-feature',
    layerAttributes: attributes,
  };
};

const updateFeatureCollectionSuccess = (state, action) => {
  const refreshLayerId = action.payload.layer;
  const {
    sidebarContent,
    drawType,
    selectedLayer,
    individualAttributeData,
    modifiedFeatureGeojson,
    featureGeojson,
    layerAttributes,
    editFeatureId,
  } = initialState;
  return {
    ...state,
    refreshLayerId,
    sidebarContent,
    drawType,
    selectedLayer,
    individualAttributeData,
    modifiedFeatureGeojson,
    featureGeojson,
    layerAttributes,
    editFeatureId,
  };
};

const getProjectGeojsonSuccess = (state, action) => ({
  ...state,
  projectGeojson: action.payload,
});

const getDataQueryFieldsSuccess = (state, action) => {
  const fields = action.payload;
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      fields,
    },
  };
};

const getDataQueryValuesSuccess = (state, action) => {
  const values = action.payload;
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      values,
    },
  };
};

const resetProjectMapState = () => ({
  ...initialState,
});

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
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.SET_MAP_CONFIG]: setMapConfig,
  [Types.SET_PROJECT_MAP_STATE]: setProjectMapState,
  [Types.GET_LAYER_ATTRIBUTE_FIELDS_SUCCESS]: getLayerAttributeFieldsSuccess,
  [Types.POST_NEW_LAYER_FEATURE_SUCCESS]: postNewLayerFeatureSuccess,
  [Types.GET_FEATURE_COLLECTION_SUCCESS]: getFeatureCollectionSuccess,
  [Types.UPDATE_FEATURE_COLLECTION_SUCCESS]: updateFeatureCollectionSuccess,
  [Types.GET_PROJECT_GEOJSON_SUCCESS]: getProjectGeojsonSuccess,
  [Types.GET_DATA_QUERY_FIELDS_SUCCESS]: getDataQueryFieldsSuccess,
  [Types.GET_DATA_QUERY_VALUES_SUCCESS]: getDataQueryValuesSuccess,
  [Types.RESET_PROJECT_MAP_STATE]: resetProjectMapState,
});

export default projectMapReducer;
