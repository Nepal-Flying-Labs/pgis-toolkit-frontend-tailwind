import { api, authenticated } from '.';

export const loginUser = payload => api.post('/users/token/login/', payload);

export const verifyUser = params =>
  authenticated(api).get(`/users/preliminary_user_verify/`, { params });
