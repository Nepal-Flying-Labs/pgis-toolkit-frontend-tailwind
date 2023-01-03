import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  projectDetail: null,
  searchText: '',
  data: {
    layers: null,
    projectAreaLayerId: null,
    uploadStatusCheckingIds: [],
    selectedData: null,
    uploadErrorResponse: null,
    manageData: {
      layerTemplate: [],
      selectedLayer: null,
      attributeList: [],
    },
  },
  gallery: {
    list: [],
    cardId: null,
    item: {},
    delete: {},
    searchText: '',
  },
  info: {
    details: {},
    location: {
      state: {},
      country: {},
    },
  },
  document: {
    list: [],
    item: {},
    delete: {},
    searchText: '',
  },
  contactPerson: [],
  user: {
    userGroup: [],
    list: [],
    searchText: '',
    userRole: null,
    ordering: null,
  },
};

const getProjectDetailSuccess = (state, action) => ({
  ...state,
  projectDetail: action.payload.data,
});

const getProjectLayersSuccess = (state, action) => {
  const data = action.payload;
  const projectAreaLayerId =
    data.find(item => item.name === 'Boundary')?.id || null;
  return {
    ...state,
    data: {
      ...state.data,
      layers: data,
      projectAreaLayerId,
    },
  };
};

const uploadDatasetsSuccess = (state, action) => {
  const layers = [...action.payload, ...state.data.layers];
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const deleteDataSuccess = (state, action) => {
  const { id: layerId } = action.payload;
  const layers = state.data.layers.filter(item => item.id !== layerId);
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const setUploadStatusCheckingId = (state, action) => {
  const id = action.payload;
  const uploadStatusCheckingIds = [...state.data.uploadStatusCheckingIds, id];
  return {
    ...state,
    data: {
      ...state.data,
      uploadStatusCheckingIds,
    },
  };
};

const checkUploadStatusSuccess = (state, action) => {
  const data = action.payload;
  const layers = state.data.layers.map(item =>
    item.id === data.id ? data : { ...item },
  );
  const uploadStatusCheckingIds = state.data.uploadStatusCheckingIds.filter(
    id => id !== data.id,
  );
  return {
    ...state,
    data: {
      ...state.data,
      layers,
      uploadStatusCheckingIds,
    },
  };
};

const setDataState = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    ...action.payload,
  },
});

const getErrorDetailSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    uploadErrorResponse: action.payload,
  },
});

const permanentDataDeleteSuccess = (state, action) => {
  const layers = state.data.layers.filter(item => item.id !== action.payload);
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const handleAddToMap = (state, action) => {
  const { id, checked } = action.payload;
  const layers = state.data.layers.map(item =>
    item.id === id ? { ...item, display_on_map: checked } : { ...item },
  );
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const updateDataFailure = (state, action) => {
  const layers = state.data.layers.map(item =>
    item.id === action.payload
      ? { ...item, display_on_map: !item.display_on_map }
      : { ...item },
  );
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const resetProjectDashboardState = () => ({
  ...initialState,
});

const setSearchText = (state, action) => ({
  ...state,
  searchText: action.payload,
});

const getProjectInfoSuccess = (state, action) => ({
  ...state,
  info: { ...state.info, details: action.payload },
});

const getContactPersonInfoSuccess = (state, action) => ({
  ...state,
  contactPerson: action.payload,
});

const getGalleryItemSuccess = (state, action) => ({
  ...state,
  gallery: { ...state.gallery, list: action.payload },
});

const getDocumentItemSuccess = (state, action) => ({
  ...state,
  document: { ...state.document, list: action.payload },
});

const getDocumentByIdSuccess = (state, action) => ({
  ...state,
  document: { ...state.document, item: action.payload },
});

const uploadDocumentDataSuccess = (state, action) => ({
  ...state,
  document: {
    ...state.document,
    list: [...action.payload, ...state.document.list],
  },
});

const deleteDocumentSuccess = (state, action) => {
  const filteredData = state.document.list.filter(
    item => item.id !== action.payload.id,
  );
  return {
    ...state,
    document: {
      ...state.document,
      list: filteredData,
    },
  };
};

const getProjectCountrySuccess = (state, action) => ({
  ...state,
  info: {
    ...state.info,
    location: { ...state.info.location, country: action.payload },
  },
});

const getProjectStateSuccess = (state, action) => ({
  ...state,
  info: {
    ...state.info,
    location: { ...state.info.location, state: action.payload },
  },
});

const getLayerTemplateSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      layerTemplate: action.payload,
    },
  },
});

const patchLayerTemplateSuccess = (state, action) => {
  const { data } = action.payload;
  const newData = state.data.manageData.layerTemplate.map(obj =>
    data.id === obj.id ? data : obj,
  );
  return {
    ...state,
    data: {
      ...state.data,
      manageData: {
        ...state.data.manageData,
        layerTemplate: newData,
      },
    },
  };
};

const setSelectedLayer = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      selectedData: action.payload,
    },
  },
});

const clearAttributeListData = state => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      attributeList: [],
    },
  },
});

const getLayerAttributeSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      attributeList: action.payload,
    },
  },
});

const getUsersSuccess = (state, action) =>
  // const { counts, next, previous } = action.payload;
  ({
    ...state,
    user: { ...state.user, list: action.payload },
  });

const setUserState = (state, action) => ({
  ...state,
  user: { ...state.user, ...action.payload },
});

const getUserGroupSuccess = (state, action) => ({
  ...state,
  userGroup: action.payload,
});

const setDocumentState = (state, action) => ({
  ...state,
  document: { ...state.document, ...action.payload },
});

const setGalleryState = (state, action) => ({
  ...state,
  gallery: { ...state.gallery, ...action.payload },
});

const getGalleryByIdSuccess = (state, action) => ({
  ...state,
  gallery: { ...state.gallery, item: action.payload },
});

const deleteGallerySuccess = (state, action) => {
  const filteredData = state.gallery.list.filter(
    item => item.id !== action.payload.id,
  );
  return {
    ...state,
    gallery: {
      ...state.gallery,
      list: filteredData,
    },
  };
};

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_DETAIL_SUCCESS]: getProjectDetailSuccess,
  [Types.GET_PROJECT_LAYERS_SUCCESS]: getProjectLayersSuccess,
  [Types.UPLOAD_DATASETS_SUCCESS]: uploadDatasetsSuccess,
  [Types.DELETE_DATA_SUCCESS]: deleteDataSuccess,
  [Types.SET_UPLOAD_STATUS_CHECKING_ID]: setUploadStatusCheckingId,
  [Types.CHECK_UPLOAD_STATUS_SUCCESS]: checkUploadStatusSuccess,
  [Types.SET_DATA_STATE]: setDataState,
  [Types.GET_ERROR_DETAIL_SUCCESS]: getErrorDetailSuccess,
  [Types.PERMANENT_DATA_DELETE_SUCCESS]: permanentDataDeleteSuccess,
  [Types.HANDLE_ADD_TO_MAP]: handleAddToMap,
  [Types.UPDATE_DATA_FAILURE]: updateDataFailure,
  [Types.RESET_PROJECT_DASHBOARD_STATE]: resetProjectDashboardState,
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.GET_PROJECT_INFO_SUCCESS]: getProjectInfoSuccess,
  [Types.GET_CONTACT_PERSON_INFO_SUCCESS]: getContactPersonInfoSuccess,
  [Types.GET_GALLERY_ITEM_SUCCESS]: getGalleryItemSuccess,
  [Types.GET_DOCUMENT_ITEM_SUCCESS]: getDocumentItemSuccess,
  [Types.GET_DOCUMENT_BY_ID_SUCCESS]: getDocumentByIdSuccess,
  [Types.DELETE_DOCUMENT_SUCCESS]: deleteDocumentSuccess,
  [Types.UPLOAD_DOCUMENT_DATA_SUCCESS]: uploadDocumentDataSuccess,
  [Types.GET_PROJECT_COUNTRY_SUCCESS]: getProjectCountrySuccess,
  [Types.GET_PROJECT_STATE_SUCCESS]: getProjectStateSuccess,
  [Types.GET_LAYER_TEMPLATE_SUCCESS]: getLayerTemplateSuccess,
  [Types.PATCH_LAYER_TEMPLATE_SUCCESS]: patchLayerTemplateSuccess,
  [Types.SET_SELECTED_LAYER]: setSelectedLayer,
  [Types.CLEAR_ATTRIBUTE_LIST_DATA]: clearAttributeListData,
  [Types.GET_LAYER_ATTRIBUTE_SUCCESS]: getLayerAttributeSuccess,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.SET_USER_STATE]: setUserState,
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,
  [Types.SET_DOCUMENT_STATE]: setDocumentState,
  [Types.SET_GALLERY_STATE]: setGalleryState,
  [Types.GET_GALLERY_BY_ID_SUCCESS]: getGalleryByIdSuccess,
  [Types.DELETE_GALLERY_SUCCESS]: deleteGallerySuccess,
});

export default projectDashboardReducer;
