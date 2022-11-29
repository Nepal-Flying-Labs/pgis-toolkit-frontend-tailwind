import { api, authenticated } from '.';

export const getProjects = params =>
  authenticated(api).get(`/projects/project/`, { params });
export const postProjectInvite = payload =>
  authenticated(api).post(`/users/preliminary_user_create/`, payload);

export const nothing = '';
