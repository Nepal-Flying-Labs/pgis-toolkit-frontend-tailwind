import { api, authenticated } from '.';

export const getUsers = params =>
  authenticated(api).get('/projects/user/', { params });

export const getOrganization = params =>
  authenticated(api).get('/projects/organization/', { params });
