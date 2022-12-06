/* eslint-disable camelcase */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';

const initialState = {
  projects: null,
  countryList: [],
  individualProject: {
    contactPerson: [],
    project: {},
    stepOne: {},
    stepTwo: {},
    stepThree: {},
    stepFour: {},
  },
  modalContent: '',
  organizationDetail: null,
};

const getOrganizationDetailSuccess = (state, action) => ({
  ...state,
  organizationDetail: action.payload,
});

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const getProjectsSuccess = (state, action) => ({
  ...state,
  projects: action.payload,
});

const getIndividualProjectSuccess = (state, action) => {
  const {
    name,
    description,
    thematic_areas,
    start_date,
    end_date,
    partners,
    bbox,
    country,
    file,
    file_type,
    geographical_region,
    geometry_type,
    location_type,
  } = action.payload;
  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      project: action.payload,
      stepOne: {
        name,
        description,
        thematic_areas,
        start_date,
        end_date,
        partners,
      },
      stepTwo: {
        bbox,
        country,
        file,
        file_type,
        geographical_region,
        geometry_type,
        location_type,
      },
    },
  };
};

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

const getContactPersonSuccess = (state, action) => {
  const { data } = action.payload;

  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      contactPerson: data,
    },
  };
};

const postContactPersonSuccess = (state, action) => ({
  ...state,
  individualProject: {
    ...state.individualProject,
    contactPerson: [...state.individualProject.contactPerson, action.payload],
  },
});

const patchContactPersonSuccess = (state, action) => {
  const newData = state.individualProject.contactPerson.filter(
    person => person.id !== action.payload.id,
  );
  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      contactPerson: newData,
    },
  };
};

const setContactPerson = (state, action) => ({
  ...state,
  individualProject: {
    ...state.individualProject,
    contactPerson: action.payload,
  },
});

const getCountryListSuccess = (state, action) => ({
  ...state,
  countryList: action.payload,
});

const organizationDashboardReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATION_DETAIL_SUCCESS]: getOrganizationDetailSuccess,
  [Types.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.GET_INDIVIDUAL_PROJECT_SUCCESS]: getIndividualProjectSuccess,
  [Types.SET_INDIVIDUAL_PROJECT]: setIndividualProject,
  [Types.GET_CONTACT_PERSON_SUCCESS]: getContactPersonSuccess,
  [Types.POST_CONTACT_PERSON_SUCCESS]: postContactPersonSuccess,
  [Types.PATCH_CONTACT_PERSON_SUCCESS]: patchContactPersonSuccess,
  [Types.SET_CONTACT_PERSON]: setContactPerson,
  [Types.GET_COUNTRY_LIST_SUCCESS]: getCountryListSuccess,
});

export default organizationDashboardReducer;
