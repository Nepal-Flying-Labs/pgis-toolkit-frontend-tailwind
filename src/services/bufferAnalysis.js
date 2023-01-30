import { api, authenticated } from '.';

// eslint-disable-next-line import/prefer-default-export
export const applyBufferAnalysis = data =>
  authenticated(api).post(`/maps/buffer_analysis/`, data);

export const getBufferAnalysisData = params =>
  authenticated(api).get(`/maps/buffer_analysis/`, { params });
