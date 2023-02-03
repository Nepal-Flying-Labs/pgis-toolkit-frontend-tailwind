/* eslint-disable camelcase */
import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  delay,
  select,
} from 'redux-saga/effects';

import projectDashboardActions, { Types } from '@Actions/projectDashboard';
import projectMapActions from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import commonActions from '@Actions/common';
import { withLoader, withErrorHandler } from '@Utils/sagaUtils';
import {
  getProjectDetail,
  getLayers,
  getLayerById,
  getUploadErrorResponse,
  permanentDataDelete,
  getProjectInfo,
  getContactPersonInfo,
  getDocumentItem,
  getGalleryItem,
  getIndividualDocument,
  downloadDocument,
  uploadDocument,
  updateDocument,
  getProjectCountry,
  getProjectState,
  getLayerTemplate,
  patchLayerTemplate,
  postImportTemplate,
  updateTemplateAttribute,
  postTemplateAttribute,
  getLayerAttribute,
  postAttributeSelection,
  downloadBulkTemplate,
  getUsers,
  getUserGroup,
  uploadGallery,
  downloadGallery,
  getIndividualGallery,
  deleteGallery,
  updateGallery,
  updateUserRole,
  updateInvitedUserStatus,
  downloadProjectLayer,
} from '@Services/projectDashboard';
import {
  getProjectThemes,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import prepareFormData from '@Utils/prepareFormData';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';

// import removeObjectKeys from '@Utils/removeObjectKeys';
// import axios from 'axios';

export function* getProjectDetailRequest({ params }) {
  try {
    const response = yield call(getProjectDetail, params);
    yield put(projectDashboardActions.getProjectDetailSuccess(response.data));
    yield put(projectMapActions.setMapConfig(response.data.data.map_config));
  } catch (error) {
    yield put(projectDashboardActions.getProjectDetailFailure());
    throw error;
  }
}

export function* getProjectLayersRequest({ params }) {
  try {
    const response = yield call(getLayers, params);
    yield put(projectDashboardActions.getProjectLayersSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectLayersFailure());
    throw error;
  }
}

export function* getCategoryListRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectDashboardActions.getCategoryListSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getCategoryListFailure());
    throw error;
  }
}

export function* uploadDatasetsRequest({ payload }) {
  try {
    const responses = yield all(payload.map(data => call(uploadLayer, data)));
    const responsesData = responses.map(res => res.data);
    const layerResponses = yield all(
      responsesData.map(item =>
        call(getLayerById, item.layer_id || item.data.id),
      ),
    );
    const layerData = layerResponses.map(res => res.data);
    yield put(projectDashboardActions.uploadDatasetsSuccess(layerData));
    yield put(commonActions.toggleModal());
    if (layerData[0]?.layer_type === 'Vector') {
      yield put(
        toastActions.success({
          message:
            'The layer is being uploaded. We will notify you shortly after upload success.',
        }),
      );
    }
  } catch (error) {
    yield put(projectDashboardActions.uploadDatasetsFailure());
    throw error;
  }
}

function getFileExtension(file) {
  switch (file) {
    case 'shapefile':
      return 'layers.zip';
    case 'geojson':
      return 'layers.geojson';
    case 'csv':
      return 'layers.csv';
    case 'kml':
      return 'layers.kml';
    case 'gpx':
      return 'layers.gpx';
    default:
      return '';
  }
}

export function* downloadProjectLayerRequest({ params }) {
  const { output_format } = params;
  try {
    const response = yield call(downloadProjectLayer, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = getFileExtension(output_format);
    link.click();
    yield put(toastActions.success({ message: 'Layer Download Completed.' }));
  } catch (error) {
    yield put(projectDashboardActions.downloadProjectLayerFailure());
    throw error;
  }
}

export function* deleteDataRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectDashboardActions.deleteDataSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
  } catch (error) {
    yield put(projectDashboardActions.deleteDataFailure());
    throw error;
  }
}

export function* checkUploadStatusRequest({ id }) {
  try {
    let responseData = { upload_status: 'uploading' };
    yield put(projectDashboardActions.setUploadStatusCheckingId(id));
    while (responseData?.upload_status === 'uploading') {
      yield delay(15 * 1000); // call api in 10 second interval
      const response = yield call(getLayerById, id);
      responseData = response.data;
    }
    const { themes } = yield select(state => state.projectMap);
    yield put(
      projectDashboardActions.checkUploadStatusSuccess({
        ...responseData,
        theme: themes.find(theme => theme.id === responseData.theme)?.name,
      }),
    );
    if (responseData.upload_status === 'successful') {
      yield put(
        toastActions.success({
          message: `${responseData.name} was successfully uploaded.`,
        }),
      );
    } else {
      yield put(
        toastActions.error({
          message: `${responseData.name} upload failed.`,
        }),
      );
    }
    // yield put(commonActions.togglePromptDialog());
  } catch (error) {
    yield put(projectDashboardActions.checkUploadStatusFailure());
    throw error;
  }
}

export function* getErrorDetailRequest({ params }) {
  try {
    const response = yield call(getUploadErrorResponse, params);
    yield put(projectDashboardActions.getErrorDetailSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getErrorDetailFailure());
    throw error;
  }
}

export function* permanentDataDeleteRequest({ id }) {
  try {
    yield call(permanentDataDelete, id);
    yield put(projectDashboardActions.permanentDataDeleteSuccess(id));
    yield put(toastActions.success({ message: 'Data deleted successfully.' }));
  } catch (error) {
    yield put(projectDashboardActions.permanentDataDeleteFailure());
    throw error;
  }
}

export function* updateDataRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(updateLayer, id, formdata);
    yield put(projectDashboardActions.updateDataSuccess());
  } catch (error) {
    yield put(projectDashboardActions.updateDataFailure(id));
    throw error;
  }
}

export function* getProjectInfoRequest({ id }) {
  try {
    const response = yield call(getProjectInfo, id);
    yield put(projectDashboardActions.getProjectInfoSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectInfoFailure());
    throw error;
  }
}

export function* getContactPersonInfoRequest({ params }) {
  try {
    const response = yield call(getContactPersonInfo, params);
    yield put(
      projectDashboardActions.getContactPersonInfoSuccess(response.data),
    );
  } catch (error) {
    yield put(projectDashboardActions.getContactPersonInfoFailure());
    throw error;
  }
}

export function* getGalleryItemRequest({ params }) {
  try {
    const response = yield call(getGalleryItem, params);
    yield put(projectDashboardActions.getGalleryItemSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getGalleryItemFailure());
    throw error;
  }
}

export function* getDocumentItemRequest({ params }) {
  try {
    const response = yield call(getDocumentItem, params);
    yield put(projectDashboardActions.getDocumentItemSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getDocumentItemFailure());
    throw error;
  }
}

export function* getDocumentByIdRequest({ id }) {
  try {
    const response = yield call(getIndividualDocument, id);
    yield put(projectDashboardActions.getDocumentByIdSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getDocumentByIdFailure());
    throw error;
  }
}

export function* downloadDocumentRequest({ params }) {
  try {
    const response = yield call(downloadDocument, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Document.zip';
    link.click();
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));
    yield put(toastActions.success({ message: 'Export Completed.' }));
  } catch (error) {
    yield put(projectDashboardActions.downloadDocumentFailure());
    throw error;
  }
}

export function* uploadDocumentDataRequest({ payload, id }) {
  try {
    yield all(payload.map(data => call(uploadDocument, data)));
    const res = yield call(getDocumentItem, { project: id });
    yield put(projectDashboardActions.getDocumentItemSuccess(res.data));
    yield put(commonActions.toggleModal());
    yield put(
      toastActions.success({
        message: 'Document uploaded successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.uploadDocumentDataFailure());
    throw error;
  }
}

export function* updateDocumentDataRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(updateDocument, id, formData);
    yield put(projectDashboardActions.updateDocumentDataSuccess(response.data));
    yield put(commonActions.toggleModal());
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));
    yield put(
      toastActions.success({
        message: 'Document updated successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.updateDocumentDataFailure());
  }
}

export function* getLayerTemplateRequest({ id }) {
  try {
    const response = yield call(getLayerTemplate, id);

    yield put(
      response.data.length < 1
        ? projectDashboardActions.postImportTemplateRequest({
            project: id,
            // templates: 'all',
          })
        : projectDashboardActions.getLayerTemplateSuccess(response.data),
    );
  } catch (error) {
    yield put(projectDashboardActions.getLayerTemplateFailure());
    throw error;
  }
}

export function* deleteDocumentRequest({ id, payload }) {
  // const filteredData = removeObjectKeys(payload, ['projectId']);
  // const pId = payload.projectId;
  const formData = prepareFormData(payload);
  try {
    const response = yield call(updateDocument, id, formData);
    yield put(projectDashboardActions.deleteDocumentSuccess(response.data));

    // const res = yield call(getDocumentItem, { project: pId });
    // yield put(projectDashboardActions.getDocumentItemSuccess(res.data));
    yield put(commonActions.togglePromptDialog());
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));

    yield put(
      toastActions.success({
        message: 'Document deleted successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.deleteDocumentFailure());
  }
}

export function* patchLayerTemplateRequest({ id, payload }) {
  try {
    const response = yield call(patchLayerTemplate, id, payload);

    yield put(projectDashboardActions.patchLayerTemplateSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.patchLayerTemplateFailure());
    throw error;
  }
}

export function* getProjectCountryRequest({ params }) {
  try {
    const response = yield call(getProjectCountry, params);
    yield put(projectDashboardActions.getProjectCountrySuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.deleteDocumentFailure());
    throw error;
  }
}

export function* getProjectStateRequest({ params }) {
  try {
    const response = yield call(getProjectState, params);
    yield put(projectDashboardActions.getProjectStateSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.deleteDocumentFailure());
  }
}

export function* postImportTemplateRequest({ payload }) {
  const { project } = payload;
  try {
    yield call(postImportTemplate, payload);
    yield put(projectDashboardActions.getLayerTemplateRequest(project));
  } catch (error) {
    yield put(projectDashboardActions.postImportTemplateFailure());
    throw error;
  }
}

export function* getLayerAttributeRequest({ params }) {
  try {
    const response = yield call(getLayerAttribute, params);
    yield put(projectDashboardActions.getLayerAttributeSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getLayerAttributeFailure());
    throw error;
  }
}

export function* postAttributeSelectionRequest({ payload }) {
  try {
    const response = yield call(postAttributeSelection, payload);
    yield put(
      projectDashboardActions.postAttributeSelectionSuccess(response.data),
    );
    yield put(commonActions.toggleModal());
    yield put(projectDashboardActions.clearAttributeListData());
  } catch (error) {
    yield put(projectDashboardActions.postAttributeSelectionFailure());
    throw error;
  }
}

export function* postTemplateAttributeRequest({ payload }) {
  try {
    const response = yield call(postTemplateAttribute, payload);
    yield put(
      projectDashboardActions.postTemplateAttributeSuccess(response.data.data),
    );
    yield put(commonActions.toggleModal('manage-attributes'));
    yield put(toastActions.success({ message: response.data.message }));
  } catch (error) {
    yield put(projectDashboardActions.postTemplateAttributeFailure());
    throw error;
  }
}

export function* updateTemplateAttributeRequest({ id, payload }) {
  try {
    const response = yield call(updateTemplateAttribute, id, payload);
    yield put(
      projectDashboardActions.updateTemplateAttributeSuccess(response.data),
    );
    yield put(commonActions.toggleModal('manage-attributes'));
    yield put(toastActions.success({ message: response.data.message }));
  } catch (error) {
    yield put(projectDashboardActions.updateTemplateAttributeFailure());
    throw error;
  }
}

export function* deleteTemplateAttributeRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(updateTemplateAttribute, id, formData);
    yield put(
      projectDashboardActions.deleteTemplateAttributeSuccess(response.data),
    );
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: response.data.message }));
  } catch (error) {
    yield put(projectDashboardActions.deleteTemplateAttributeFailure());
    throw error;
  }
}

export function* downloadBulkTemplateRequest({ params }) {
  try {
    const response = yield call(downloadBulkTemplate, params);
    const url = response.request.responseURL;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template.zip'); // or any other extension
    document.body.appendChild(link);
    link.click();
    yield put(
      projectDashboardActions.downloadBulkTemplateSuccess(response.data),
    );
  } catch (error) {
    yield put(projectDashboardActions.downloadBulkTemplateFailure());
    throw error;
  }
}

export function* getUsersRequest({ params }) {
  try {
    const response = yield call(getUsers, params);
    yield put(projectDashboardActions.getUsersSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getUsersFailure());
    throw error;
  }
}

export function* getUserGroupRequest({ params }) {
  try {
    const response = yield call(getUserGroup, params);
    yield put(projectDashboardActions.getUserGroupSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getUserGroupFailure());
  }
}
export function* uploadGalleryRequest({ id, payload }) {
  try {
    yield all(payload.map(data => call(uploadGallery, data)));
    const response = yield call(getGalleryItem, {
      project: id,
    });
    yield put(projectDashboardActions.getGalleryItemSuccess(response.data));
    yield put(commonActions.toggleModal());
    yield put(
      toastActions.success({
        message: 'Gallery uploaded successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.uploadGalleryFailure());
    throw error;
  }
}

export function* downloadGalleryRequest({ params }) {
  try {
    const response = yield call(downloadGallery, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Gallery.zip';
    link.click();
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));
    yield put(toastActions.success({ message: 'Export Completed.' }));
  } catch (error) {
    yield put(projectDashboardActions.downloadGalleryFailure());
    throw error;
  }
}

export function* getGalleryByIdRequest({ id }) {
  try {
    const response = yield call(getIndividualGallery, id);
    yield put(projectDashboardActions.getGalleryByIdSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getGalleryByIdFailure());
    throw error;
  }
}

export function* deleteGalleryRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    yield call(deleteGallery, id, formData);
    yield put(projectDashboardActions.deleteGallerySuccess({ id }));
    yield put(commonActions.togglePromptDialog());
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));

    yield put(
      toastActions.success({
        message: 'Gallery deleted successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.deleteGalleryFailure());
  }
}

export function* updateGalleryRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(updateGallery, id, formData);
    yield put(projectDashboardActions.updateGallerySuccess(response.data));
    yield put(commonActions.toggleModal());
    yield put(commonActions.setRightSidebarState({ show: false, flag: '' }));
    yield put(
      toastActions.success({
        message: 'Gallery updated successfully.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.updateGalleryFailure());
  }
}
export function* updateUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(projectDashboardActions.updateUserStatusSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.updateUserStatusFailure());
    throw error;
  }
}
export function* deleteUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(projectDashboardActions.deleteUserSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(projectDashboardActions.deleteUserFailure());
    throw error;
  }
}

export function* updateInvitedUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(
      projectDashboardActions.updateInvitedUserStatusSuccess(response.data),
    );
  } catch (error) {
    yield put(projectDashboardActions.updateInvitedUserStatusFailure());
    throw error;
  }
}

export function* deleteInvitedUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(projectDashboardActions.deleteInvitedUserSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(projectDashboardActions.deleteInvitedUserFailure());
    throw error;
  }
}

export function* resendInvitationRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    // eslint-disable-next-line no-unused-vars
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(projectDashboardActions.resendInvitationSuccess({ id }));
    yield put(toastActions.success({ message: 'Resend invitation success' }));
  } catch (error) {
    yield put(projectDashboardActions.resendInvitationFailure());
    throw error;
  }
}

function* projectDashboardWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_DETAIL_REQUEST,
    withLoader(withErrorHandler(getProjectDetailRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_LAYERS_REQUEST,
    withLoader(withErrorHandler(getProjectLayersRequest)),
  );
  yield takeLatest(
    Types.GET_CATEGORY_LIST_REQUEST,
    withLoader(withErrorHandler(getCategoryListRequest)),
  );
  yield takeLatest(
    Types.UPLOAD_DATASETS_REQUEST,
    withLoader(withErrorHandler(uploadDatasetsRequest)),
  );
  yield takeLatest(
    Types.DELETE_DATA_REQUEST,
    withLoader(withErrorHandler(deleteDataRequest)),
  );
  yield takeEvery(
    Types.CHECK_UPLOAD_STATUS_REQUEST,
    withLoader(withErrorHandler(checkUploadStatusRequest)),
  );
  yield takeLatest(
    Types.GET_ERROR_DETAIL_REQUEST,
    withLoader(withErrorHandler(getErrorDetailRequest)),
  );
  yield takeLatest(
    Types.PERMANENT_DATA_DELETE_REQUEST,
    withLoader(withErrorHandler(permanentDataDeleteRequest)),
  );
  yield takeLatest(
    Types.UPDATE_DATA_REQUEST,
    withLoader(withErrorHandler(updateDataRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_INFO_REQUEST,
    withLoader(withErrorHandler(getProjectInfoRequest)),
  );
  yield takeLatest(
    Types.GET_CONTACT_PERSON_INFO_REQUEST,
    withLoader(withErrorHandler(getContactPersonInfoRequest)),
  );
  yield takeLatest(
    Types.GET_GALLERY_ITEM_REQUEST,
    withLoader(withErrorHandler(getGalleryItemRequest)),
  );
  yield takeLatest(
    Types.GET_DOCUMENT_ITEM_REQUEST,
    withLoader(withErrorHandler(getDocumentItemRequest)),
  );
  yield takeLatest(
    Types.GET_DOCUMENT_BY_ID_REQUEST,
    withLoader(withErrorHandler(getDocumentByIdRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_DOCUMENT_REQUEST,
    withLoader(withErrorHandler(downloadDocumentRequest)),
  );
  yield takeLatest(
    Types.UPLOAD_DOCUMENT_DATA_REQUEST,
    withLoader(withErrorHandler(uploadDocumentDataRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_PROJECT_LAYER_REQUEST,
    withLoader(withErrorHandler(downloadProjectLayerRequest)),
  );
  yield takeLatest(
    Types.UPDATE_DOCUMENT_DATA_REQUEST,
    withLoader(withErrorHandler(updateDocumentDataRequest)),
  );
  yield takeLatest(
    Types.DELETE_DOCUMENT_REQUEST,
    withLoader(withErrorHandler(deleteDocumentRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_COUNTRY_REQUEST,
    withLoader(withErrorHandler(getProjectCountryRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_STATE_REQUEST,
    withLoader(withErrorHandler(getProjectStateRequest)),
  );
  yield takeLatest(
    Types.GET_LAYER_TEMPLATE_REQUEST,
    withLoader(withErrorHandler(getLayerTemplateRequest)),
  );
  yield takeLatest(
    Types.PATCH_LAYER_TEMPLATE_REQUEST,
    withLoader(withErrorHandler(patchLayerTemplateRequest)),
  );
  yield takeLatest(
    Types.POST_IMPORT_TEMPLATE_REQUEST,
    withLoader(withErrorHandler(postImportTemplateRequest)),
  );
  yield takeLatest(
    Types.GET_LAYER_ATTRIBUTE_REQUEST,
    withLoader(withErrorHandler(getLayerAttributeRequest)),
  );
  yield takeLatest(
    Types.POST_ATTRIBUTE_SELECTION_REQUEST,
    withLoader(withErrorHandler(postAttributeSelectionRequest)),
  );

  yield takeLatest(
    Types.POST_TEMPLATE_ATTRIBUTE_REQUEST,
    withLoader(withErrorHandler(postTemplateAttributeRequest)),
  );

  yield takeLatest(
    Types.UPDATE_TEMPLATE_ATTRIBUTE_REQUEST,
    withLoader(withErrorHandler(updateTemplateAttributeRequest)),
  );
  yield takeLatest(
    Types.DELETE_TEMPLATE_ATTRIBUTE_REQUEST,
    withLoader(withErrorHandler(deleteTemplateAttributeRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_BULK_TEMPLATE_REQUEST,
    withLoader(withErrorHandler(downloadBulkTemplateRequest)),
  );
  yield takeLatest(
    Types.GET_USERS_REQUEST,
    withLoader(withErrorHandler(getUsersRequest)),
  );
  yield takeLatest(
    Types.GET_USER_GROUP_REQUEST,
    withLoader(withErrorHandler(getUserGroupRequest)),
  );
  yield takeLatest(
    Types.UPLOAD_GALLERY_REQUEST,
    withLoader(withErrorHandler(uploadGalleryRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_GALLERY_REQUEST,
    withLoader(withErrorHandler(downloadGalleryRequest)),
  );
  yield takeLatest(
    Types.GET_GALLERY_BY_ID_REQUEST,
    withLoader(withErrorHandler(getGalleryByIdRequest)),
  );
  yield takeLatest(
    Types.DELETE_GALLERY_REQUEST,
    withLoader(withErrorHandler(deleteGalleryRequest)),
  );
  yield takeLatest(
    Types.UPDATE_GALLERY_REQUEST,
    withLoader(withErrorHandler(updateGalleryRequest)),
  );
  yield takeLatest(
    Types.UPDATE_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_USER_REQUEST,
    withLoader(withErrorHandler(deleteUserRequest)),
  );
  yield takeLatest(
    Types.UPDATE_INVITED_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateInvitedUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_INVITED_USER_REQUEST,
    withLoader(withErrorHandler(deleteInvitedUserRequest)),
  );
  yield takeLatest(
    Types.RESEND_INVITATION_REQUEST,
    withLoader(withErrorHandler(resendInvitationRequest)),
  );
}

export default projectDashboardWatcher;
