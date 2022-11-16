import { api, authenticated } from '.';

export const getOrganizations = () =>
  authenticated(api).get('/projects/organization/');

export const nothing = '';
