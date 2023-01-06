import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getUsersRequest: ['params'],
    getUsersSuccess: ['payload'],
    getUsersFailure: null,

    // getOrganizationRequest: ['payload'],
    // getOrganizationSuccess: ['payload'],
    // getOrganizationFailure: null,

    setUserState: ['payload'],
    // handleOrdering: ['payload'],

    // handleNextClick: null,
    // handlePreviousClick: null,
    // handleJumpsTo: ['payload'],
    // handleRowSelect: ['payload'],

    updateUserStatusRequest: ['id', 'payload'],
    updateUserStatusSuccess: ['payload'],
    updateUserStatusFailure: null,

    deleteUserRequest: ['id', 'payload'],
    deleteUserSuccess: ['payload'],
    deleteUserFailure: null,

    updateInvitedUserStatusRequest: ['id', 'payload'],
    updateInvitedUserStatusSuccess: ['payload'],
    updateInvitedUserStatusFailure: null,

    resendInvitationRequest: ['id', 'payload'],
    resendInvitationSuccess: ['payload'],
    resendInvitationFailure: null,

    deleteInvitedUserRequest: ['id', 'payload'],
    deleteInvitedUserSuccess: ['payload'],
    deleteInvitedUserFailure: null,
  },
  { prefix: '/users' },
);

export default Creators;
