import { api, authenticated } from '.';

export const loginUser = payload => api.post('/users/token/login/', payload);

export const verifyUser = params =>
  api.get(`/users/preliminary_user_verify/`, { params });

export const createUser = data => api.get(`/users/user/`, data);

export const signUpUser = data => api.post(`/users/user/`, data);

export const forgotPassword = payload =>
  api.post(`/users/forgot_password_email/`, payload);

export const resetPassword = (params, payload) =>
  api.post(`/users/reset_password/`, payload, { params });

export const getUserPermissions = params =>
  authenticated(api).get(`/users/permissions/`, { params });

export const landingPage = () => authenticated(api).get('/users/landing_page/');

export const getUserGroup = () => authenticated(api).get('/users/user_group/');
