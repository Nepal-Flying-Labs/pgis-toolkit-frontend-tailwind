import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';

const initialState = {
  projects: null,
  individualProject: {},
  modalContent: '',
};

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const getProjectsSuccess = (state, action) => ({
  ...state,
  projects: action.payload,
});

const getIndividualProjectSuccess = (state, action) => ({
  ...state,
  individualProject: action.payload,
});

const organizationDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.GET_INDIVIDUAL_PROJECT_SUCCESS]: getIndividualProjectSuccess,
});

export default organizationDashboardReducer;
