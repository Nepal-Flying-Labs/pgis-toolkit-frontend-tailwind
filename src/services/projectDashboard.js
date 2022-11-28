import { api, authenticated } from '.';

export const getProjectThemes = params =>
  authenticated(api).get(`/maps/theme/`, { params });

export const nothing = '';
