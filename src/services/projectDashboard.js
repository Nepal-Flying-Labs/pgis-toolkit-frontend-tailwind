import { api, authenticated } from '.';

export const getProjectDetail = params =>
  authenticated(api).get(`/projects/project_detail/`, { params });

export const getLayers = params =>
  authenticated(api).get(`/maps/layer/`, { params });

export const getLayerById = id => authenticated(api).get(`/maps/layer/${id}/`);

export const getUploadErrorResponse = params =>
  authenticated(api).get(`maps/get_layer_upload_task_response/`, { params });

export const permanentDataDelete = id =>
  authenticated(api).delete(`maps/layer/${id}/`);

// project-dashboard-info
export const getProjectInfo = id =>
  authenticated(api).get(`/projects/project/${id}/`);

// contact-person-info
export const getContactPersonInfo = params =>
  authenticated(api).get(`/projects/contact_person/`, { params });
