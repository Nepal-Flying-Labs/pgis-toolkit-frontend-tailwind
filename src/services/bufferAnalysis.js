import { api, authenticated } from '.';

// eslint-disable-next-line import/prefer-default-export
export const applyBufferAnalysis = data =>
  authenticated(api).post(`/maps/buffer_analysis/`, data);

export const getBufferAnalysisData = params =>
  authenticated(api).get(`/maps/buffer_analysis/`, { params });

export const getBufferAreaCollection = params =>
  authenticated(api).get(`/maps/buffer_area_collection/`, { params });

export const saveBufferLayer = data =>
  authenticated(api).post(`/maps/layer_from_buffer/`, data);
