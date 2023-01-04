import { api, authenticated } from '.';

export const getOrganizations = params =>
  authenticated(api).get('/projects/organization/', { params });

export const createOrganization = data =>
  authenticated(api).post('/users/preliminary_user_create/', data);
