import { api, authenticated } from '.';

export const checkError = (apiEndPoint, params) =>
  authenticated(api).get(`/maps/${apiEndPoint}/`, { params });

export const autoFixError = (apiEndPoint, params) =>
  authenticated(api).get(`/maps/${apiEndPoint}/`, { params });

export const copyFeatures = data =>
  authenticated(api).post(`/maps/copy_features/`, data);

export const getErrorFeatures = params =>
  authenticated(api).get(`/maps/cleaning_error_features/`, { params });

export const getFeatureCollectionMirror = id =>
  authenticated(api).get(`/maps/feature_collection_mirror/${id}/`);

export const updateFeatureCollection = (id, data) =>
  authenticated(api).patch(`/maps/feature_collection_mirror/${id}/`, data);

export const postFeatureCollection = data =>
  authenticated(api).post(`/maps/feature_collection_mirror/`, data);

export const bulkDeleteNullGeometry = data =>
  authenticated(api).post(`/maps/bulk_del_null_geom/`, data);

export const getFeatureMirrorGeojson = params =>
  authenticated(api).get(`/maps/feature_mirror_geojson/`, { params });

export const dataCleanTaskResponse = params =>
  authenticated(api).get(`/maps/data_clean_task_response/`, { params });
