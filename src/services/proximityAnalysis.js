import { api, authenticated } from '.';

// eslint-disable-next-line import/prefer-default-export
export const applyProximityAnalysis = data =>
  authenticated(api).post(`/maps/buffer_analysis/`, data);

export const getProximityAnalysisData = params =>
  authenticated(api).get(`/maps/buffer_analysis/`, { params });

export const getProximityAreaCollection = params =>
  authenticated(api).get(`/maps/buffer_area_collection/`, { params });

export const saveProximityLayer = data =>
  authenticated(api).post(`/maps/layer_from_buffer/`, data);

export const getFeatureCollectionMirror = params =>
  authenticated(api).get(`/maps/feature_collection_mirror/`, { params });
