import { api } from '.';

export const loginUser = payload => api.post('/login/', payload);

export const nothing = '';
