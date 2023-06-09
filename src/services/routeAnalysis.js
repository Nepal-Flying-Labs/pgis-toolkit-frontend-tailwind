import { api, authenticated, downloadApi } from '.';

export const optimumRouteAnalysis = data =>
  authenticated(api).post(`/maps/optimum_route_analysis/`, data);

export const getAnalysisTaskResponse = params =>
  authenticated(api).get(`/maps/get_analysis_task_response/`, { params });

export const getAnalysisResultDetail = params =>
  authenticated(api).get(`/maps/analysis_result_detail/`, { params });

export const getNetworkRoute = id =>
  authenticated(api).get(`/maps/network_route_collection/${id}/`);

export const getNetworkRouteCollection = params =>
  authenticated(api).get(`/maps/network_route_collection/`, { params });

export const saveRouteLayer = data =>
  authenticated(api).post(`/maps/layer_from_optimum_path/`, data);

export const downloadOptimumRouteAnalysis = params =>
  authenticated(downloadApi).get(`/maps/export_optimum_route_analysis/`, {
    params,
  });
