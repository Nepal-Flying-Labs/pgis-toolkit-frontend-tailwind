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

    patchProjectRequest: ['id', 'payload'],
    patchProjectSuccess: ['payload'],
    patchProjectFailure: null,

    setIndividualProject: ['payload'],

    toggleModal: ['payload'],
  },
  { prefix: 'organizationDashboard/' },
);

export default Creators;
