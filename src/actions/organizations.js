import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getOrganizationsRequest: ['params'],
    getOrganizationsSuccess: ['payload'],
    getOrganizationsFailure: null,

    createOrganizationRequest: ['payload'],
    createOrganizationSuccess: ['payload'],
    createOrganizationFailure: null,

    setSearchText: ['payload'],
    handleOrdering: ['payload'],

    handleNextClick: null,
    handlePreviousClick: null,
    handleJumpsTo: ['payload'],
    handleRowSelect: ['payload'],

    setSelectedOrganization: ['payload'],

    deleteOrganizationRequest: ['id', 'payload'],
    deleteOrganizationSuccess: ['payload'],
    deleteOrganizationFailure: null,
  },
  { prefix: '/organizations' },
);

export default Creators;
