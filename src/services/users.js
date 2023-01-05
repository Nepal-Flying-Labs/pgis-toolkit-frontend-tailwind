import { api, authenticated } from '.';

export const getUsers = params =>
  authenticated(api).get('/users/user/', { params });

export const getOrganization = params =>
  authenticated(api).get('/projects/organization/', { params });

export const updateUserRole = (id, payload) =>
  authenticated(api).patch(`/users/userrole_update/${id}/`, payload);

export const updateInvitedUserStatus = (id, payload) =>
  authenticated(api).patch(`/users/preliminary_user/${id}/`, payload);
