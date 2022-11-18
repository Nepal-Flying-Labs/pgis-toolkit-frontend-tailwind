import { api, authenticated } from '.';

export const getOrganizations = () =>
  authenticated(api).get('/projects/organization/');

export const createOrganization = data =>
  authenticated(api).post('/users/preliminary_user_create/', data);
