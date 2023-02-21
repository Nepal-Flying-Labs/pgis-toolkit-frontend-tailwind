/* eslint-disable camelcase */
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
    selectedLayer: null,
    fields: null,
    values: null,
    queryResults: [],
    selectedData: null,
  },
  layerAttributesList: {
    attributeList: [],
    searchTerm: '',
    ordering: null,
    pagination: {
      page: 1,
      rowSelect: 10,
      count: null,
      next: null,
      previous: null,
    },
    selectedLayerAttribute: null,
  },
  fieldsDropdownOptions: null,
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

const postAdvanceQuerySuccess = (state, action) => {
  const {
    name: layerName,
    style,
    theme,
    id: layer,
  } = state.dataQuery.selectedLayer;
  const queryResults = [
    ...state.dataQuery.queryResults,
    {
      ...action.payload,
      checked: true,
      layerName,
      style,
      theme,
      layer,
    },
  ];
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      queryResults,
    },
  };
};

const handleDataQueryCheckbox = (state, action) => {
  const { id, checked } = action.payload;
  const queryResults = state.dataQuery.queryResults.map(item =>
    item.id === id ? { ...item, checked } : { ...item },
  );
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      queryResults,
    },
  };
};

const setDataQueryState = (state, action) => ({
  ...state,
  dataQuery: {
    ...state.dataQuery,
    ...action.payload,
  },
});

const saveDataQuerySuccess = (state, action) => {
  const { style, id: queryLayerId } = state.dataQuery.selectedData;
  const { layer: id, theme, geom_type: geometryType } = action.payload;
  const newLayer = {
    ...action.payload,
    id,
    checked: true,
    layer_type: 'Vector',
    style: {
      ...style,
      geometryType,
    },
  };
  const layers = {
    ...state.layers,
    [theme]: [...state.layers[theme], newLayer],
  };
  const mapSettings = {
    ...state.mapSettings,
    layerOrder: [id, ...state.mapSettings.layerOrder],
    checkedLayers: [...state.mapSettings.checkedLayers, id],
  };
  const queryResults = state.dataQuery.queryResults.filter(
    item => item.id !== queryLayerId,
  );
  return {
    ...state,
    layers,
    mapSettings,
    dataQuery: {
      ...state.dataQuery,
      queryResults,
      selectedData: null,
    },
  };
};

const deleteDataQuery = (state, action) => {
  const queryLayerId = action.payload;
  const queryResults = state.dataQuery.queryResults.filter(
    item => item.id !== queryLayerId,
  );
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      queryResults,
      selectedData: null,
    },
  };
};

const deleteAllDataQuery = state => {
  const { queryResults } = initialState.dataQuery;
  return {
    ...state,
    dataQuery: {
      ...state.dataQuery,
      queryResults,
    },
  };
};

const getLayerAttributeSuccess = (state, action) => {
  const { counts, next, previous, results } = action.payload;
  return {
    ...state,
    layerAttributesList: {
      ...state.layerAttributesList,
      attributeList: results,
      pagination: {
        ...state.layerAttributesList.pagination,
        count: counts,
        next,
        previous,
      },
    },
  };
};
const setAttributeTableSearchTerm = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    searchTerm: action.payload,
  },
});

const handleAttributeNextClick = state => {
  if (state.layerAttributesList.pagination.next !== null) {
    return {
      ...state,
      layerAttributesList: {
        ...state.layerAttributesList,
        pagination: {
          ...state.layerAttributesList.pagination,
          page: state.layerAttributesList.pagination.page + 1,
        },
      },
    };
  }
  return {
    ...state,
  };
};

const handleAttributePreviousClick = state => {
  if (state.layerAttributesList.pagination.previous !== null) {
    return {
      ...state,
      layerAttributesList: {
        ...state.layerAttributesList,
        pagination: {
          ...state.layerAttributesList.pagination,
          page: state.layerAttributesList.pagination.page - 1,
        },
      },
    };
  }
  return {
    ...state,
  };
};

const handleAttributeJumpsTo = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    pagination: {
      ...state.layerAttributesList.pagination,
      page: action.payload,
    },
  },
});

const handleAttributeRowSelect = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    pagination: {
      ...state.layerAttributesList.pagination,
      page: 1,
      rowSelect: action.payload,
    },
  },
});

const handleAttributeOrdering = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    ordering: action.payload,
  },
});

const resetLayerAttributeListState = state => ({
  ...state,
  layerAttributesList: {
    attributeList: [],
    searchTerm: '',
    ordering: null,
    pagination: {
      page: 1,
      rowSelect: 10,
      count: null,
      next: null,
      previous: null,
    },
  },
});

const updateLayerAttributeSuccess = (state, action) => {
  const { attributes, id, is_deleted } = action.payload;
  const newData = state.layerAttributesList.attributeList.map(attribute =>
    attribute.id === id ? { ...attributes } : { ...attribute },
  );

  const newDataDeleted = state.layerAttributesList.attributeList.filter(
    attribute => attribute.id !== id,
  );
  if (!is_deleted) {
    return {
      ...state,
      layerAttributesList: {
        ...state.layerAttributesList,
        attributeList: newData,
      },
    };
  }
  return {
    ...state,
    layerAttributesList: {
      ...state.layerAttributesList,
      attributeList: newDataDeleted,
    },
  };
};

const getQueryAttributeSuccess = (state, action) => {
  const { counts, next, previous, results } = action.payload;
  return {
    ...state,
    layerAttributesList: {
      ...state.layerAttributesList,
      attributeList: results,
      pagination: {
        ...state.layerAttributesList.pagination,
        count: counts,
        next,
        previous,
      },
    },
  };
};

const setSelectedLayerAttribute = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    selectedLayerAttribute: action.payload,
  },
});

const updateLayerAttributeFieldsSuccess = (state, action) => {
  const data = action.payload;
  const filterData = {
    id: data.id,
    name: data.name,
    alias: data.alias,
    data_type: data.data_type,
    mandatory: data.mandatory,
  };
  const newData = state.individualAttributeData.map(item =>
    item.id !== data.id ? { ...item } : { ...filterData },
  );

  return {
    ...state,
    individualAttributeData: newData,
  };
};

const getFieldsDropdownOptionSuccess = (state, action) => {
  const data = action.payload;
  const object = data.reduce(
    (obj, item) => ({ ...obj, [item.id]: item.name }),
    {},
  );
  return {
    ...state,
    fieldsDropdownOptions: object,
  };
};

const resetProjectMapState = state => ({
  ...initialState,
  mapSettings: state.mapSettings,
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
  [Types.POST_ADVANCE_QUERY_SUCCESS]: postAdvanceQuerySuccess,
  [Types.HANDLE_DATA_QUERY_CHECKBOX]: handleDataQueryCheckbox,
  [Types.SET_DATA_QUERY_STATE]: setDataQueryState,
  [Types.SAVE_DATA_QUERY_SUCCESS]: saveDataQuerySuccess,
  [Types.DELETE_DATA_QUERY]: deleteDataQuery,
  [Types.DELETE_ALL_DATA_QUERY]: deleteAllDataQuery,
  [Types.GET_LAYER_ATTRIBUTE_SUCCESS]: getLayerAttributeSuccess,
  [Types.SET_ATTRIBUTE_TABLE_SEARCH_TERM]: setAttributeTableSearchTerm,
  [Types.HANDLE_ATTRIBUTE_NEXT_CLICK]: handleAttributeNextClick,
  [Types.HANDLE_ATTRIBUTE_PREVIOUS_CLICK]: handleAttributePreviousClick,
  [Types.HANDLE_ATTRIBUTE_JUMPS_TO]: handleAttributeJumpsTo,
  [Types.HANDLE_ATTRIBUTE_ROW_SELECT]: handleAttributeRowSelect,
  [Types.HANDLE_ATTRIBUTE_ORDERING]: handleAttributeOrdering,
  [Types.RESET_LAYER_ATTRIBUTE_LIST_STATE]: resetLayerAttributeListState,
  [Types.GET_QUERY_ATTRIBUTE_SUCCESS]: getQueryAttributeSuccess,
  [Types.SET_SELECTED_LAYER_ATTRIBUTE]: setSelectedLayerAttribute,
  [Types.UPDATE_LAYER_ATTRIBUTE_SUCCESS]: updateLayerAttributeSuccess,
  [Types.UPDATE_LAYER_ATTRIBUTE_FIELDS_SUCCESS]:
    updateLayerAttributeFieldsSuccess,
  [Types.GET_FIELDS_DROPDOWN_OPTION_SUCCESS]: getFieldsDropdownOptionSuccess,
  [Types.RESET_PROJECT_MAP_STATE]: resetProjectMapState,
});

export default projectMapReducer;
