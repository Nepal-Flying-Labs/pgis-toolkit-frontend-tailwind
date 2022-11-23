import { api, authenticated } from '.';

export const loginUser = payload => api.post('/users/token/login/', payload);

export const verifyUser = params =>
  authenticated(api).get(`/users/preliminary_user_verify/`, { params });

export const createUser = data => authenticated(api).get(`/users/user/`, data);

export const signUpUser = data => authenticated(api).post(`/users/user/`, data);

export const forgotPassword = payload =>
  api.post(`/users/forgot_password_email/`, payload);

export const resetPassword = (params, payload) =>
  api.post(`/users/reset_password/`, { params }, payload);

export const getUserPermissions = params =>
  authenticated(api).get(`/users/permissions/`, { params });
