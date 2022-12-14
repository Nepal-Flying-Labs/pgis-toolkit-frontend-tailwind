import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  projectDetail: null,
  data: {
    layers: null,
    uploadStatusCheckingIds: [],
    selectedData: null,
  },
};

const getProjectDetailSuccess = (state, action) => ({
  ...state,
  projectDetail: action.payload.data,
});

const getProjectLayersSuccess = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      layers: action.payload,
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

const setDataState = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      ...action.payload,
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
});

export default projectDashboardReducer;
