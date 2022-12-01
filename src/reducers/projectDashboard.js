import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/projectDashboard';

const initialState = {
  projectDetail: null,
};

const getProjectDetailSuccess = (state, action) => {
  return {
    ...state,
    projectDetail: action.payload.data,
  };
};

const projectDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECT_DETAIL_SUCCESS]: getProjectDetailSuccess,
});

export default projectDashboardReducer;
