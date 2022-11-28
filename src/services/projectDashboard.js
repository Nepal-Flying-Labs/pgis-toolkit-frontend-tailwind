import { api, authenticated } from '.';

export const getProjectThemes = params =>
  authenticated(api).get(`/maps/theme/`, { params });

export const getProjectThemeLayers = params =>
  authenticated(api).get(`/maps/project_theme_layers/`, { params });

export const uploadLayer = data =>
  authenticated(api).post(`/maps/layer/`, data);
