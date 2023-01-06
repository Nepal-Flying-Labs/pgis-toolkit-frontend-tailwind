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
  authenticated(api).get(`/projects/contact_person/`, { params });

export const postContactPerson = (payload, params) =>
  authenticated(api).post(`/projects/contact_person/`, payload, { params });

export const patchContactPerson = (id, payload) =>
  authenticated(api).patch(`/projects/contact_person/${id}/`, payload);

export const getCountryList = () => authenticated(api).get('/projects/country');

export const getUsers = params =>
  authenticated(api).get('/users/user/', { params });

export const getUserGroup = params =>
  authenticated(api).get('/users/user_group/', { params });

export const updateUserRole = (id, payload) =>
  authenticated(api).patch(`/users/userrole_update/${id}/`, payload);

export const updateInvitedUserStatus = (id, payload) =>
  authenticated(api).patch(`/users/preliminary_user/${id}/`, payload);

export const updateOrganization = (id, payload) =>
  authenticated(api).patch(`/projects/organization/${id}/`, payload);

export const organizationById = id =>
  authenticated(api).get(`/projects/organization/${id}/`);
