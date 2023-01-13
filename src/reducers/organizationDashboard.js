/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/organizationDashboard';
import { getFileExtension } from '@Utils/commonUtils';
import { getUserGroupRequest } from '@Sagas/organizationDashboard';

const initialState = {
  projects: null,
  selectedProject: null,
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
  individualOrganization: {
    item: {},
    contactPerson: [],
  },
  selectedData: null,
  drawnGeojsonData: null,
  users: [],
  userGroup: [],
  usersFilter: {
    searchText: '',
    userRole: null,
    ordering: null,
  },
  assignList: [],
  organizationAssignList: [],
  userTab: 'users',
  hideSidebar: false,
};

const getOrganizationDetailSuccess = (state, action) => ({
  ...state,
  organizationDetail: action.payload,
});

const getProjectsSuccess = (state, action) => {
  const { data, hasNoProject } = action.payload;
  return {
    ...state,
    projects: { ...data, hasNoProject },
  };
};

const getIndividualProjectSuccess = (state, action) => {
  const {
    id,
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

  const imageNameArray = cover_image?.split('/');
  const imageName = imageNameArray
    ? imageNameArray[imageNameArray.length - 1]
    : '';
  return {
    ...state,
    individualProject: {
      ...state.individualProject,
      project: {
        ...action.payload,
        file: file
          ? {
              fileURL: file,
              name: fileName,
              type: file_type,
              lastModifiedDate: last_updated,
              existedData: true,
            }
          : '',
      },
      stepOne: {
        ...state.individualProject.stepOne,
        name,
        cover_image: cover_image
          ? {
              name: imageName,
              image: cover_image,
              lastModifiedDate: last_updated,
              type: getFileExtension(cover_image),
              existedData: true,
            }
          : '',
        description,
        thematic_areas,
        start_date,
        end_date,
        partners,
      },
      stepTwo: {
        id,
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
  const { data, type } = action.payload;
  const { name, email, position, contact, id } = data[0] || {};
  if (type === 'project') {
    return {
      ...state,
      individualProject: {
        ...state.individualProject,
        stepOne: {
          ...state.individualProject.stepOne,
          contactName: name || '',
          contactPosition: position || '',
          contactPhone: contact || '',
          contactEmail: email || '',
          contactId: id,
        },
        contactDetails: {
          name: name || '',
          position: position || '',
          email: email || '',
          contact: contact || '',
        },
      },
    };
  }
  return {
    ...state,
    individualOrganization: {
      ...state.individualOrganization,
      contactPerson: data,
    },
  };
};

const postContactPersonSuccess = (state, action) => {
  const { data, type } = action.payload;
  const { name, position, email, contact, id } = data || {};
  if (type === 'project') {
    return {
      ...state,
      individualProject: {
        ...state.individualProject,
        stepOne: {
          ...state.individualProject.stepOne,
          contactName: name || '',
          contactPosition: position || '',
          contactPhone: contact || '',
          contactEmail: email || '',
          contactId: id,
        },
      },
    };
  }
  return {
    ...state,
    individualOrganization: {
      ...state.individualOrganization,
      contactPerson: [...state.individualOrganization.contactPerson, data],
    },
  };
};

const patchContactPersonSuccess = (state, action) => {
  const { data, type } = action.payload;
  const { name, position, email, contact, id, is_deleted } = data || {};
  if (type === 'project') {
    const newData = !is_deleted
      ? {
          contactName: name || '',
          contactPosition: position || '',
          contactPhone: contact || '',
          contactEmail: email || '',
          contactId: id,
        }
      : {
          contactName: '',
          contactPosition: '',
          contactPhone: '',
          contactEmail: '',
        };
    return {
      ...state,
      individualProject: {
        ...state.individualProject,
        stepOne: {
          ...state.individualProject.stepOne,
          ...newData,
        },
      },
    };
  }

  const newData = state.individualOrganization.contactPerson.filter(
    person => person.id !== data.id,
  );
  return {
    ...state,
    individualOrganization: {
      ...state.individualOrganization,
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

const getUserGroupSuccess = (state, action) => ({
  ...state,
  userGroup: action.payload,
});

const getAllProjectSuccess = (state, action) => ({
  ...state,
  assignList: action.payload,
});

const setAssignList = (state, action) => ({
  ...state,
  organizationAssignList: [action.payload],
  assignList: [],
});

const updateUserStatusSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.users.map(user => {
    const { active } = user;
    return user.id === userData.id ? { ...user, active: !active } : { ...user };
  });
  return {
    ...state,
    users: newData,
  };
};

const deleteUserSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.users.map(user =>
    user.id === userData.id ? null : { ...user },
  );
  return {
    ...state,
    users: newData,
  };
};

const setSelectedData = (state, action) => ({
  ...state,
  selectedData: action.payload,
});

const handleUserTabChange = (state, action) => ({
  ...state,
  userTab: action.payload,
});

const updateInvitedUserStatusSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.users.map(user =>
    user.id === userData.id ? { ...user, status: 'Expired' } : { ...user },
  );
  return {
    ...state,
    users: newData,
  };
};

const resendInvitationSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.users.map(user =>
    user.id === userData.id ? { ...user, status: 'Pending' } : { ...user },
  );
  return {
    ...state,
    users: newData,
  };
};

const deleteInvitedUserSuccess = (state, action) => {
  const userData = action.payload;
  const newData = state.users.filter(user => user.id !== userData.id);
  return {
    ...state,
    users: newData,
  };
};

const setDrawnGeojsonData = (state, action) => ({
  ...state,
  drawnGeojsonData: action.payload,
});

const resetOrganizationDashboardState = () => ({
  ...initialState,
});

const setUserState = (state, action) => ({
  ...state,
  usersFilter: { ...state.usersFilter, ...action.payload },
});

const updateOrganizationSuccess = (state, action) => ({
  ...state,
  organizationDetail: action.payload,
});

const getOrganizationByIdSuccess = (state, action) => {
  const data = action.payload;
  return {
    ...state,
    individualOrganization: {
      ...state.individualOrganization,
      item: {
        ...data,
        cover_image: data?.cover_image ? { image: data.cover_image } : {},
      },
    },
  };
};

const toggleSidebar = state => ({
  ...state,
  hideSidebar: !state.hideSidebar,
});

const setSelectedProject = (state, action) => ({
  ...state,
  selectedProject: action.payload,
});

const deleteProjectSuccess = (state, action) => {
  const data = action.payload;
  const newData = state.projects?.results.filter(
    project => project.id !== data.id,
  );

  return {
    ...state,
    projects: {
      ...state.projects,
      results: newData,
    },
  };
};

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
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,
  [Types.GET_ALL_PROJECT_SUCCESS]: getAllProjectSuccess,
  [Types.SET_ASSIGN_LIST]: setAssignList,
  [Types.UPDATE_USER_STATUS_SUCCESS]: updateUserStatusSuccess,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.SET_SELECTED_DATA]: setSelectedData,
  [Types.HANDLE_USER_TAB_CHANGE]: handleUserTabChange,
  [Types.UPDATE_INVITED_USER_STATUS_SUCCESS]: updateInvitedUserStatusSuccess,
  [Types.RESEND_INVITATION_SUCCESS]: resendInvitationSuccess,
  [Types.DELETE_INVITED_USER_SUCCESS]: deleteInvitedUserSuccess,
  [Types.SET_DRAWN_GEOJSON_DATA]: setDrawnGeojsonData,
  [Types.RESET_ORGANIZATION_DASHBOARD_STATE]: resetOrganizationDashboardState,
  [Types.SET_USER_STATE]: setUserState,
  [Types.UPDATE_ORGANIZATION_SUCCESS]: updateOrganizationSuccess,
  [Types.GET_ORGANIZATION_BY_ID_SUCCESS]: getOrganizationByIdSuccess,
  [Types.TOGGLE_SIDEBAR]: toggleSidebar,
  [Types.SET_SELECTED_PROJECT]: setSelectedProject,
  [Types.DELETE_PROJECT_SUCCESS]: deleteProjectSuccess,
});

export default organizationDashboardReducer;
