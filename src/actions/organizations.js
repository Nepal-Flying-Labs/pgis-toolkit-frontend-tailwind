import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getOrganizationsRequest: ['payload'],
    getOrganizationsSuccess: ['payload'],
    getOrganizationsFailure: null,
  },
  { prefix: '/organizations' },
);

export default Creators;
