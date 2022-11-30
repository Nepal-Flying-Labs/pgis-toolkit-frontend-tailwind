import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectsRequest: ['params'],
    getProjectsSuccess: ['payload'],
    getProjectsFailure: null,

    postProjectInviteRequest: ['payload'],
    postProjectInviteSuccess: ['payload'],
    postProjectInviteFailure: null,

    getIndividualProjectRequest: ['id'],
    getIndividualProjectSuccess: ['payload'],
    getIndividualProjectFailure: null,

    toggleModal: ['payload'],
  },
  { prefix: 'organizationDashboard/' },
);

export default Creators;
