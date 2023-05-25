import { api, authenticated } from '.';

export const createAnalysis = data =>
  authenticated(api).post(`/maps/analysis/`, data);

export const getAnalysisDetail = id =>
  authenticated(api).get(`/maps/analysis/${id}/`);

export const getAnalysisResultList = params =>
  authenticated(api).get(`/maps/analysis_result_list/`, { params });

export const getIndividualAnalysisDetail = params =>
  authenticated(api).get(`/maps/analysis_result_detail/`, { params });
