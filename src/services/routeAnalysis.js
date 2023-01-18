import { api, authenticated } from '.';

export const optimumRouteAnalysis = data =>
  authenticated(api).post(`/maps/optimum_route_analysis/`, data);

export const getAnalysisTaskResponse = params =>
  authenticated(api).get(`/maps/get_analysis_task_response/`, { params });

export const getAnalysisLayer = params =>
  authenticated(api).get(`/maps/analysis_layer/`, { params });

export const getNetworkRoute = id =>
  authenticated(api).get(`/maps/network_route_collection/${id}/`);

export const getNetworkRouteCollection = params =>
  authenticated(api).get(`/maps/network_route_collection/`, { params });
