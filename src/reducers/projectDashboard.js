import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  projectDetail: null,
  searchText: '',
  data: {
    layers: null,
    uploadStatusCheckingIds: [],
    selectedData: null,
    uploadErrorResponse: null,
  },
  // gallery: {
  //   list: [],
  // },
  info: {
    details: [],
    location: [],
  },

  contactPerson: [],
};

const getProjectDetailSuccess = (state, action) => ({
  ...state,
  projectDetail: action.payload.data,
});

const getProjectLayersSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    layers: action.payload,
  },
});

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
});

export default projectDashboardReducer;
