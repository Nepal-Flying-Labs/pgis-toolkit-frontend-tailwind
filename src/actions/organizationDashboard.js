import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getOrganizationDetailRequest: ['id'],
    getOrganizationDetailSuccess: ['payload'],
    getOrganizationDetailFailure: null,

    getProjectsRequest: ['params'],
    getProjectsSuccess: ['payload'],
    getProjectsFailure: null,

    postProjectInviteRequest: ['payload'],
    postProjectInviteSuccess: ['payload'],
    postProjectInviteFailure: null,

    getIndividualProjectRequest: ['id'],
    getIndividualProjectSuccess: ['payload'],
    getIndividualProjectFailure: null,

    getContactPersonRequest: ['params'],
    getContactPersonSuccess: ['payload'],
    getContactPersonFailure: null,

    setContactPerson: ['payload'],

    postContactPersonRequest: ['payload', 'params'],
    postContactPersonSuccess: ['payload'],
    postContactPersonFailure: null,

    patchContactPersonRequest: ['id', 'params'],
    patchContactPersonSuccess: ['payload'],
    patchContactPersonFailure: null,

    patchProjectRequest: ['id', 'payload'],
    patchProjectSuccess: ['payload'],
    patchProjectFailure: null,

    getCountryListRequest: null,
    getCountryListSuccess: ['payload'],
    getCountryListFailure: null,

    getUsersRequest: ['params'],
    getUsersSuccess: ['payload'],
    getUsersFailure: null,

    setIndividualProject: ['payload'],

    setUserRole: ['payload'],
    setSearchText: ['payload'],
    setUsersOrdering: ['payload'],

    clearUsersFilter: null,

    resetOrganizationDashboardState: null,

    getUserGroupRequest: ['params'],
    getUserGroupSuccess: ['payload'],
    getUserGroupFailure: null,

    getAllProjectRequest: ['params'],
    getAllProjectSuccess: ['payload'],
    getAllProjectFailure: null,

    postAssignUserRequest: ['payload'],
    postAssignUserSuccess: ['payload'],
    postAssignUserFailure: null,

    setAssignList: ['payload'],
  },
  { prefix: 'organizationDashboard/' },
);

export default Creators;
