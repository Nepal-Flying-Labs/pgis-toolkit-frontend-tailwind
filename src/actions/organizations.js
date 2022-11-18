import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getOrganizationsRequest: ['payload'],
    getOrganizationsSuccess: ['payload'],
    getOrganizationsFailure: null,

    createOrganizationRequest: ['payload'],
    createOrganizationSuccess: ['payload'],
    createOrganizationFailure: null,

    toggleModal: ['payload'],
  },
  { prefix: '/organizations' },
);

export default Creators;
