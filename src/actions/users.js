import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getUsersRequest: ['params'],
    getUsersSuccess: ['payload'],
    getUsersFailure: null,

    getOrganizationRequest: ['payload'],
    getOrganizationSuccess: ['payload'],
    getOrganizationFailure: null,

    setSearchText: ['payload'],
    // handleOrdering: ['payload'],

    // handleNextClick: null,
    // handlePreviousClick: null,
    // handleJumpsTo: ['payload'],
    // handleRowSelect: ['payload'],
  },
  { prefix: '/users' },
);

export default Creators;
