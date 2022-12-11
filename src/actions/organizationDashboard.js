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

    postContactPersonRequest: ['payload'],
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

    setIndividualProject: ['payload'],

    toggleModal: ['payload'],
  },
  { prefix: 'organizationDashboard/' },
);

export default Creators;
