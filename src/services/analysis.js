import { api, authenticated } from '.';

export const createAnalysis = data =>
  authenticated(api).post(`/maps/analysis/`, data);

export const getAnalysisDetail = id =>
  authenticated(api).get(`/maps/analysis/${id}/`);
