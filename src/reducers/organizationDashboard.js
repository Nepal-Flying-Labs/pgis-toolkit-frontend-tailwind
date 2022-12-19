/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';
import { getFileExtension } from '@Utils/commonUtils';

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
  organizationDetail: null,
  users: null,
  usersFilter: {
    searchText: '',
    userRole: null,
    ordering: null,
  },
};

const getOrganizationDetailSuccess = (state, action) => ({
  ...state,
  organizationDetail: action.payload,
});

const getProjectsSuccess = (state, action) => ({
  ...state,
  projects: action.payload,
});

const getIndividualProjectSuccess = (state, action) => {
  const {
    name,
    cover_image,
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
    last_updated,
  } = action.payload;

  const fileNameArray = file?.split('/');
  const fileName = fileNameArray ? fileNameArray[fileNameArray.length - 1] : '';
  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      project: action.payload,
      stepOne: {
        name,
        cover_image: cover_image
          ? [
              {
                image: cover_image,
                fileName: getFileExtension(cover_image),
                existedData: true,
              },
            ]
          : [],
        description,
        thematic_areas,
        start_date,
        end_date,
        partners,
      },
      stepTwo: {
        bbox,
        country,
        file: file
          ? {
              fileURL: file,
              name: fileName,
              type: file_type,
              lastModifiedDate: last_updated,
              existedData: true,
            }
          : '',
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

const setUserRole = (state, action) => ({
  ...state,
  usersFilter: {
    ...state.usersFilter,
    userRole: action.payload,
  },
});

const setSearchText = (state, action) => ({
  ...state,
  usersFilter: {
    ...state.usersFilter,
    searchText: action.payload,
  },
});

const getUsersSuccess = (state, action) => ({
  ...state,
  users: action.payload,
});

const setUsersOrdering = (state, action) => ({
  ...state,
  usersFilter: {
    ...state.usersFilter,
    ordering: action.payload,
  },
});

const clearUsersFilter = state => ({
  ...state,
  usersFilter: {
    searchText: '',
    userRole: null,
  },
});

const resetOrganizationDashboardState = () => ({
  ...initialState,
});

const organizationDashboardReducer = createReducer(initialState, {
  [Types.GET_ORGANIZATION_DETAIL_SUCCESS]: getOrganizationDetailSuccess,
  [Types.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
  [Types.GET_INDIVIDUAL_PROJECT_SUCCESS]: getIndividualProjectSuccess,
  [Types.SET_INDIVIDUAL_PROJECT]: setIndividualProject,
  [Types.GET_CONTACT_PERSON_SUCCESS]: getContactPersonSuccess,
  [Types.POST_CONTACT_PERSON_SUCCESS]: postContactPersonSuccess,
  [Types.PATCH_CONTACT_PERSON_SUCCESS]: patchContactPersonSuccess,
  [Types.SET_CONTACT_PERSON]: setContactPerson,
  [Types.GET_COUNTRY_LIST_SUCCESS]: getCountryListSuccess,
  [Types.SET_USER_ROLE]: setUserRole,
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.SET_USERS_ORDERING]: setUsersOrdering,
  [Types.CLEAR_USERS_FILTER]: clearUsersFilter,
  [Types.RESET_ORGANIZATION_DASHBOARD_STATE]: resetOrganizationDashboardState,
});

export default organizationDashboardReducer;
