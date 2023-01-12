import { api, authenticated } from '.';

export const optimumRouteAnalysis = data =>
  authenticated(api).post(`/maps/optimum_route_analysis/`, data);

export const nothing = '';
