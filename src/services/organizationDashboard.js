import { api, authenticated } from '.';

export const getOrganizationDetail = id =>
  authenticated(api).get(`/projects/organization/${id}`);

export const getProjects = params =>
  authenticated(api).get(`/projects/project/`, { params });

export const postProjectInvite = payload =>
  authenticated(api).post(`/users/preliminary_user_create/`, payload);

export const getIndividualProject = id =>
  authenticated(api).get(`/projects/project/${id}/`);

export const patchProject = (id, payload) =>
  authenticated(api).patch(`/projects/project/${id}/`, payload);

export const getContactPerson = params =>
  authenticated(api).get(`/projects/contact_person/`, params);

export const getCountryList = () => authenticated(api).get('/projects/country');
