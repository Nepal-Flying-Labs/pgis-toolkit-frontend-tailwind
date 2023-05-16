import { api, authenticated } from '.';

export const createAnalysis = data =>
  authenticated(api).post(`/maps/analysis/`, data);

export const nothing = '';
