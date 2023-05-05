import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/analysis';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { boundaryLayerName } from '@src/constants/map';

const initialState = {
  analysisType: null,
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
  selectedLayer: null, // select origin/destination layer
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
  selectedInfo: null, // selected value for info content
  hideSidebar: false,
  // analysisList: null, // []
  selectedAnalysis: null, // selected analysis type for create analysis
  analysisDetail: null, // selected analysis type for create analysis
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
    ? layerData.find(item => item.name === boundaryLayerName)?.id || null
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

const getLayerAttributeSuccess = (state, action) => {
  const { counts, next, previous, results } = action.payload;
  return {
    ...state,
    layerAttributesList: {
      ...state.layerAttributesList,
      attributeList: results.map((item, index) => ({
        attrId: index + 1,
        ...item,
        checked: false,
      })),
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

const handleSelectAllCheckbox = (state, action) => ({
  ...state,
  layerAttributesList: {
    ...state.layerAttributesList,
    attributeList: state.layerAttributesList.attributeList.map(item => ({
      ...item,
      checked: action.payload,
    })),
  },
});

const handleTableCheckbox = (state, action) => {
  const { id, analysisType } = action.payload;
  if (analysisType === 'bufferAnalysis') {
    return {
      ...state,
      layerAttributesList: {
        ...state.layerAttributesList,
        attributeList: state.layerAttributesList.attributeList.map(item => {
          const { checked } = item;

          return {
            ...item,
            checked: id === item.attrId ? !checked : checked,
          };
        }),
      },
    };
  }
  return {
    ...state,
    layerAttributesList: {
      ...state.layerAttributesList,
      attributeList: state.layerAttributesList.attributeList.map(item => ({
        ...item,
        checked: id === item.attrId,
      })),
    },
  };
};

const setSelectedInfo = (state, action) => ({
  ...state,
  selectedInfo: action.payload,
});

const toggleSidebar = (state, action) => ({
  ...state,
  hideSidebar: !!action.payload || !state.hideSidebar,
});

const resetAnalysisState = state => ({
  ...initialState,
  selectedAnalysis: state.selectedAnalysis, // selected analysis type for create analysis
  analysisDetail: state.analysisDetail, // selected analysis type for create analysis
});

const analysisReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
  [Types.GET_PROJECT_THEMES_SUCCESS]: getProjectThemesSuccess,
  [Types.GET_PROJECT_THEME_LAYERS_SUCCESS]: getProjectThemeLayersSuccess,
  [Types.HANDLE_LAYER_CHECKBOX]: handleLayerCheckbox,
  [Types.SET_ZOOM_TO_LAYER_ID]: setZoomToLayerId,
  [Types.GET_PROJECT_GEOJSON_SUCCESS]: getProjectGeojsonSuccess,
  [Types.GET_LAYER_ATTRIBUTE_SUCCESS]: getLayerAttributeSuccess,
  [Types.SET_ATTRIBUTE_TABLE_SEARCH_TERM]: setAttributeTableSearchTerm,
  [Types.HANDLE_ATTRIBUTE_NEXT_CLICK]: handleAttributeNextClick,
  [Types.HANDLE_ATTRIBUTE_PREVIOUS_CLICK]: handleAttributePreviousClick,
  [Types.HANDLE_ATTRIBUTE_JUMPS_TO]: handleAttributeJumpsTo,
  [Types.HANDLE_ATTRIBUTE_ROW_SELECT]: handleAttributeRowSelect,
  [Types.HANDLE_ATTRIBUTE_ORDERING]: handleAttributeOrdering,
  [Types.RESET_LAYER_ATTRIBUTE_LIST_STATE]: resetLayerAttributeListState,
  [Types.HANDLE_TABLE_CHECKBOX]: handleTableCheckbox,
  [Types.HANDLE_SELECT_ALL_CHECKBOX]: handleSelectAllCheckbox,
  [Types.SET_SELECTED_INFO]: setSelectedInfo,
  [Types.TOGGLE_SIDEBAR]: toggleSidebar,
  [Types.RESET_ANALYSIS_STATE]: resetAnalysisState,
});

export default analysisReducer;
