import { api, authenticated } from '.';

export const checkError = (apiEndPoint, params) =>
  authenticated(api).get(`/maps/${apiEndPoint}/`, { params });

export const autoFixError = (apiEndPoint, params) =>
  authenticated(api).get(`/maps/${apiEndPoint}/`, { params });

export const copyFeatures = data =>
  authenticated(api).post(`/maps/copy_features/`, data);

export const getErrorFeatures = params =>
  authenticated(api).get(`/maps/cleaning_error_features/`, { params });

export const updateFeatureCollection = (id, data) =>
  authenticated(api).patch(`/maps/feature_collection_mirror/${id}/`, data);
