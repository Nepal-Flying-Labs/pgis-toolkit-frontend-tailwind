import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';

const initialState = {
  projects: null,
  individualProject: {
    pageOne: {},
    pageTwo: {},
    pageThree: {},
    pageFour: {},
  },
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
  individualProject: {
    ...state.individualProject,
    pageOne: action.payload,
    pageTwo: action.payload,
  },
});

const setIndividualProject = (state, action) => {
  const { key, value } = action.payload;
  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      [key]: value,
    },
  };
};

const organizationDashboardReducer = createReducer(initialState, {
  [Types.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.GET_INDIVIDUAL_PROJECT_SUCCESS]: getIndividualProjectSuccess,
  [Types.SET_INDIVIDUAL_PROJECT]: setIndividualProject,
});

export default organizationDashboardReducer;
