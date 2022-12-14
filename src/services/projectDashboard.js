import { api, authenticated } from '.';

export const getProjectDetail = params =>
  authenticated(api).get(`/projects/project_detail/`, { params });

export const getLayers = params =>
  authenticated(api).get(`/maps/layer/`, { params });

export const getLayerById = id => authenticated(api).get(`/maps/layer/${id}/`);

export const getUploadErrorResponse = params =>
  authenticated(api).get(`maps/get_layer_upload_task_response/`, { params });
