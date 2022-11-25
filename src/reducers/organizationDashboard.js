import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';

const initialState = {
  projects: null,
};

const getProjectsSuccess = (state, action) => ({
  ...state,
  projects: action.payload,
});

const organizationDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
});

export default organizationDashboardReducer;
