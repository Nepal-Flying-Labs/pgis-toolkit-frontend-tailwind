import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';
import { boundaryLayerName } from '@src/constants/map';

const initialState = {
  projectDetail: null,
  searchText: '',
  data: {
    uploadingImage: [],
    layers: null,
    projectAreaLayerId: null,
    uploadStatusCheckingIds: [],
    selectedData: null,
    uploadErrorResponse: null,
    manageData: {
      layerTemplate: [],
      selectedLayer: null,
      individualAttribute: null,
      attributeList: null, // []
      dropdownOptions: null,
    },
  },
  gallery: {
    list: [],
    cardId: null,
    item: {},
    delete: {},
    searchText: '',
    ordering: '',
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
    ordering: '',
  },
  contactPerson: [],
  user: {
    userGroup: [],
    list: [],
    searchText: '',
    userRole: null,
    ordering: null,
    pageTab: 'users',
  },
};

const getProjectDetailSuccess = (state, action) => ({
  ...state,
  projectDetail: action.payload.data,
});

const getProjectLayersSuccess = (state, action) => {
  const data = action.payload;
  const projectAreaLayerId =
    data.find(item => item.name === boundaryLayerName)?.id || null;
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

const updateDocumentDataSuccess = (state, action) => {
  const filteredData = state.document.list.filter(
    item => item.id !== action.payload.id,
  );
  return {
    ...state,
    document: {
      ...state.document,
      list: [action.payload, ...filteredData],
    },
  };
};

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

const postTemplateAttributeSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      attributeList: [...state.data.manageData.attributeList, action.payload],
    },
  },
});

const updateTemplateAttributeSuccess = (state, action) => {
  const { data } = action.payload;
  const newData = state.data.manageData.attributeList.map(item =>
    item.id === data.id ? { ...data } : { ...item },
  );
  return {
    ...state,
    data: {
      ...state.data,
      manageData: {
        ...state.data.manageData,
        attributeList: newData,
      },
    },
  };
};

const deleteTemplateAttributeSuccess = (state, action) => {
  const { data } = action.payload;
  const newData = state.data.manageData.attributeList.filter(
    item => item.id !== data.id,
  );
  return {
    ...state,
    data: {
      ...state.data,
      manageData: {
        ...state.data.manageData,
        attributeList: newData,
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

const setIndividualAttribute = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      individualAttribute: action.payload,
    },
  },
});

const clearIndividualAttribute = state => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      individualAttribute: null,
    },
  },
});

const setAttributeList = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      attributeList: action.payload,
    },
  },
});

const clearAttributeListData = state => ({
  ...state,
  data: {
    ...state.data,
    manageData: {
      ...state.data.manageData,
      attributeList: null,
      selectedData: null,
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

const updateGallerySuccess = (state, action) => {
  const filteredData = state.gallery.list.filter(
    item => item.id !== action.payload.id,
  );
  return {
    ...state,
    gallery: {
      ...state.gallery,
      list: [action.payload, ...filteredData],
    },
  };
};

const updateUserStatusSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.user.list.map(item => {
    const { active } = item;
    return item.id === userData.id ? { ...item, active: !active } : { ...item };
  });
  return {
    ...state,
    user: { ...state.user, list: newData },
  };
};

const deleteUserSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.user.list.map(item =>
    item.id === userData.id ? null : { ...item },
  );
  return {
    ...state,
    user: { ...state.user, list: newData },
  };
};

const updateInvitedUserStatusSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.user.list.map(item =>
    item.id === userData.id ? { ...item, status: 'Expired' } : { ...item },
  );
  return {
    ...state,
    user: { ...state.user, list: newData },
  };
};

const resendInvitationSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.user.list.map(item =>
    item.id === userData.id ? { ...item, status: 'Pending' } : { ...item },
  );
  return {
    ...state,
    user: { ...state.user, list: newData },
  };
};

const deleteInvitedUserSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.user.list.map(item =>
    item.id === userData.id ? null : { ...item },
  );
  return {
    ...state,
    user: { ...state.user, list: newData },
  };
};

const updateDataLayerSuccess = (state, action) => {
  const data = action.payload;
  const selectedLayer = state.data.layers.filter(
    layer => layer.id === data.id,
  )[0];

  const editedSelectedLayer = { ...selectedLayer, ...data };

  const newData = state.data.layers.map(layer =>
    layer.id !== data.id ? { ...layer } : { ...editedSelectedLayer },
  );

  return {
    ...state,
    data: {
      ...state.data,
      layers: newData,
    },
  };
};

const getTemplateDropdownChoiceSuccess = (state, action) => {
  const data = action.payload.map(item => ({ ...item, flag: 'patch' }));

  return {
    ...state,
    data: {
      ...state.data,
      manageData: {
        ...state.data.manageData,
        dropdownOptions: data,
      },
    },
  };
};

const uploadFeatureImageSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    uploadingImage: action.payload,
  },
});

const setUploadImageStatusCheckingId = (state, action) => {
  const { id } = action.payload;
  const filterData = state.data.uploadingImage.filter(
    item => item.task_id !== id,
  );
  // const uploadStatusCheckingIds = [...state.data.uploadStatusCheckingIds, id];
  return {
    ...state,
    data: {
      ...state.data,
      uploadingImage: filterData,
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
  [Types.UPDATE_DOCUMENT_DATA_SUCCESS]: updateDocumentDataSuccess,
  [Types.GET_PROJECT_COUNTRY_SUCCESS]: getProjectCountrySuccess,
  [Types.GET_PROJECT_STATE_SUCCESS]: getProjectStateSuccess,
  [Types.GET_LAYER_TEMPLATE_SUCCESS]: getLayerTemplateSuccess,
  [Types.PATCH_LAYER_TEMPLATE_SUCCESS]: patchLayerTemplateSuccess,
  [Types.POST_TEMPLATE_ATTRIBUTE_SUCCESS]: postTemplateAttributeSuccess,
  [Types.UPDATE_TEMPLATE_ATTRIBUTE_SUCCESS]: updateTemplateAttributeSuccess,
  [Types.DELETE_TEMPLATE_ATTRIBUTE_SUCCESS]: deleteTemplateAttributeSuccess,
  [Types.SET_SELECTED_LAYER]: setSelectedLayer,
  [Types.SET_ATTRIBUTE_LIST]: setAttributeList,
  [Types.SET_INDIVIDUAL_ATTRIBUTE]: setIndividualAttribute,
  [Types.CLEAR_INDIVIDUAL_ATTRIBUTE]: clearIndividualAttribute,
  [Types.CLEAR_ATTRIBUTE_LIST_DATA]: clearAttributeListData,
  [Types.GET_LAYER_ATTRIBUTE_SUCCESS]: getLayerAttributeSuccess,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.SET_USER_STATE]: setUserState,
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,
  [Types.SET_DOCUMENT_STATE]: setDocumentState,
  [Types.SET_GALLERY_STATE]: setGalleryState,
  [Types.GET_GALLERY_BY_ID_SUCCESS]: getGalleryByIdSuccess,
  [Types.DELETE_GALLERY_SUCCESS]: deleteGallerySuccess,
  [Types.UPDATE_GALLERY_SUCCESS]: updateGallerySuccess,
  [Types.UPDATE_USER_STATUS_SUCCESS]: updateUserStatusSuccess,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.UPDATE_INVITED_USER_STATUS_SUCCESS]: updateInvitedUserStatusSuccess,
  [Types.RESEND_INVITATION_SUCCESS]: resendInvitationSuccess,
  [Types.DELETE_INVITED_USER_SUCCESS]: deleteInvitedUserSuccess,
  [Types.UPDATE_DATA_LAYER_SUCCESS]: updateDataLayerSuccess,
  [Types.GET_TEMPLATE_DROPDOWN_CHOICE_SUCCESS]:
    getTemplateDropdownChoiceSuccess,
  [Types.UPLOAD_FEATURE_IMAGE_SUCCESS]: uploadFeatureImageSuccess,
  [Types.SET_UPLOAD_IMAGE_STATUS_CHECKING_ID]: setUploadImageStatusCheckingId,
});

export default projectDashboardReducer;
