import { api, authenticated, downloadApi } from '.';

// eslint-disable-next-line import/prefer-default-export
export const applyProximityAnalysis = data =>
  authenticated(api).post(`/maps/proximity_analysis/`, data);

export const getProximityAnalysisData = params =>
  authenticated(api).get(`/maps/proximity_analysis/`, { params });

export const getProximityAreaCollection = params =>
  authenticated(api).get(`/maps/proximity_area_collection/`, { params });

export const saveProximityLayer = data =>
  authenticated(api).post(`/maps/layer_from_proximity/`, data);

export const getFeatureCollectionMirror = params =>
  authenticated(api).get(`/maps/feature_collection_mirror/`, { params });

// proximity-analysis-download
export const downloadProximityAnalysis = params =>
  authenticated(downloadApi).get(`/maps/export_proximity_analysis/`, {
    params,
  });
