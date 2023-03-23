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

export const updateFeatureCollection = (id, data) =>
  authenticated(api).patch(`/maps/feature_collection/${id}/`, data);

export const getProjectGeojson = params =>
  authenticated(api).get(`/projects/project_location_geojson/`, { params });

export const getAdvanceQueryValues = params =>
  authenticated(api).get(`/maps/advance_query/`, { params });

export const postAdvanceQuery = data =>
  authenticated(api).post(`/maps/advance_query/`, data);

export const saveDataQuery = data =>
  authenticated(api).post(`/maps/layer_from_query/`, data);

export const getLayerAttribute = params =>
  authenticated(api).get(`/maps/feature_collection/`, { params });

export const getQueryAttribute = params =>
  authenticated(api).get(`/maps/query_feature_collection/`, { params });

export const getFeatureGeojson = id =>
  authenticated(api).get(`/maps/feature_geojson/${id}/`);

export const updateLayerAttributeFields = (id, data) =>
  authenticated(api).patch(`/maps/layer_attribute/${id}/`, data);

export const getFieldsDropdownOption = params =>
  authenticated(api).get(`/maps/dropdown_choice/`, { params });

export const updateDropdownOption = (id, data) =>
  authenticated(api).patch(`/maps/dropdown_choice/${id}/`, data);

export const postDropdownOption = data =>
  authenticated(api).post(`/maps/dropdown_choice/`, data);

export const deleteDropdownOption = id =>
  authenticated(api).delete(`/maps/dropdown_choice/${id}/`);

export const postLayerAttributeFields = data =>
  authenticated(api).post(`/maps/layer_attribute/`, data);

export const deleteLayerAttribute = id =>
  authenticated(api).delete(`/maps/layer_attribute/${id}/`);

export const postFeatureImage = data =>
  authenticated(api).post(`/maps/feature_image/`, data);

export const updateFeatureImage = (id, data) =>
  authenticated(api).patch(`/maps/feature_image/${id}/`, data);

export const deleteFeatureImage = id =>
  authenticated(api).delete(`/maps/feature_image/${id}/`);

export const postCreateToUrl = data =>
  authenticated(api).post(`/maps/bulk_create_image_from_urls/`, data);

export const deleteDataQuery = data =>
  authenticated(api).delete(`/maps/advance_query/`, { data });
