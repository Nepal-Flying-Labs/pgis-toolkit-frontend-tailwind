import { api, authenticated } from '.';

export const getProjects = params =>
  authenticated(api).get(`/projects/project/`, { params });

export const nothing = '';
