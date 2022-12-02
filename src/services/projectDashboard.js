import { api, authenticated } from '.';

export const getProjectDetail = params =>
  authenticated(api).get(`/projects/project_detail/`, { params });

export const nothing = '';
