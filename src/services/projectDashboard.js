import { api, authenticated, downloadApi } from '.';

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

// gallery-item
export const getGalleryItem = params =>
  authenticated(api).get(`/projects/image/`, { params });

// Document-item
export const getDocumentItem = params =>
  authenticated(api).get(`/projects/document/`, { params });

// individual-Document-item
export const getIndividualDocument = id =>
  authenticated(api).get(`/projects/document/${id}/`);

// Document-download
export const downloadDocument = params =>
  authenticated(downloadApi).get(`/projects/document_download/`, { params });

// upload-document
export const uploadDocument = payload =>
  authenticated(api).post(`/projects/document/`, payload);

// update-document-item
export const updateDocument = (id, payload) =>
  authenticated(api).patch(`/projects/document/${id}/`, payload);

// project-location-item
export const getProjectCountry = params =>
  authenticated(api).get(`/projects/country/`, { params });

// project-location-item
export const getProjectState = params =>
  authenticated(api).get(`/projects/state/`, { params });

export const getLayerTemplate = id =>
  authenticated(api).get(`/maps/project_layer_template/?project=${id}`);

export const patchLayerTemplate = (id, payload) =>
  authenticated(api).patch(`/maps/project_layer_template/${id}/`, payload);

export const postImportTemplate = payload =>
  authenticated(api).post(`/maps/import_template/`, payload);

export const getLayerAttribute = params =>
  authenticated(api).get(`/maps/project_layer_template_attribute/`, { params });

export const postAttributeSelection = payload =>
  authenticated(api).post(`/maps/update_template_attributes/`, payload);

export const downloadBulkTemplate = params =>
  authenticated(api).get(`/maps/bulk_template_download/`, { params });

export const getUsers = params =>
  authenticated(api).get('/users/user/', { params });

export const getUserGroup = params =>
  authenticated(api).get('/users/user_group/', { params });

// upload-gallery
export const uploadGallery = payload =>
  authenticated(api).post(`/projects/image/`, payload);

// gallery-download
export const downloadGallery = params =>
  authenticated(downloadApi).get(`/projects/image_download/`, { params });

// individual-gallery-item
export const getIndividualGallery = id =>
  authenticated(api).get(`/projects/image/${id}/`);

// update-document-item
export const updateGallery = (id, payload) =>
  authenticated(api).patch(`/projects/image/${id}/`, payload);

// update-document-item
export const deleteGallery = (id, payload) =>
  authenticated(api).delete(`/projects/image/${id}/`, payload);

export const updateUserRole = (id, payload) =>
  authenticated(api).patch(`/users/userrole_update/${id}/`, payload);

export const updateInvitedUserStatus = (id, payload) =>
  authenticated(api).patch(`/users/preliminary_user/${id}/`, payload);
