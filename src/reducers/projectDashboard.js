import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  projectDetail: null,
  data: {
    layers: null,
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
  const layers = [...state.data.layers, ...action.payload];
  return {
    ...state,
    data: {
      ...state.data,
      layers,
    },
  };
};

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_DETAIL_SUCCESS]: getProjectDetailSuccess,
  [Types.GET_PROJECT_LAYERS_SUCCESS]: getProjectLayersSuccess,
  [Types.UPLOAD_DATASETS_SUCCESS]: uploadDatasetsSuccess,
});

export default projectDashboardReducer;
