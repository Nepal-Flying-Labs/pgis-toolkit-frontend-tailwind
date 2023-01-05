import { api, authenticated } from '.';

export const checkError = (apiEndPoint, params) =>
  authenticated(api).get(`/maps/${apiEndPoint}/`, { params });

export const nothing = '';
