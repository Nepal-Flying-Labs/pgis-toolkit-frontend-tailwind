import { api, authenticated } from '.';

export const getProjectThemes = params =>
  authenticated(api).get(`/maps/theme/`, { params });

export const getProjectThemeLayers = params =>
  authenticated(api).get(`/maps/project_theme_layers/`, { params });

export const uploadLayer = data =>
  authenticated(api).post(`/maps/layer/`, data);

export const updateLayer = (id, data) =>
  authenticated(api).patch(`/maps/layer/${id}/`, data);

export const getMapPopupData = params =>
  authenticated(api).get(`/maps/feature_popup/`, { params });

export const saveMapConfig = (params, data) =>
  authenticated(api).patch(`/maps/map_config/`, data, { params });

export const getLayerAttributeFields = params =>
  authenticated(api).get(`/maps/layer_attribute/`, { params });

export const postNewLayerFeature = data =>
  authenticated(api).post(`/maps/feature_collection/`, data);

export const getFeatureCollection = id =>
  authenticated(api).get(`/maps/feature_collection/${id}/`);
