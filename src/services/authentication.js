import { api } from '.';

export const loginUser = payload => api.post('/users/token/login/', payload);

export const nothing = '';
