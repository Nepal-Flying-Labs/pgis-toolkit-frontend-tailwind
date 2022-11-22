import { api } from './index';

export const loginUser = payload => api.post('/login/', payload);

export const forgotPassword = payload =>
  api.post('/forgot_password_email/', payload);
