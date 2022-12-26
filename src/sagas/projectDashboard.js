import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  delay,
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
} from '@Services/projectDashboard';
import {
  getProjectThemes,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import prepareFormData from '@Utils/prepareFormData';

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
      responsesData.map(item => call(getLayerById, item.layer_id)),
    );
    const layerData = layerResponses.map(res => res.data);
    yield put(projectDashboardActions.uploadDatasetsSuccess(layerData));
    yield put(commonActions.toggleModal());
    yield put(
      toastActions.success({
        message:
          'The layer is being uploaded. We will notify you shortly after upload success.',
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.uploadDatasetsFailure());
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
      yield delay(1000 * 15); // call api in 10 second interval
      const response = yield call(getLayerById, id);
      responseData = response.data;
    }
    yield put(projectDashboardActions.checkUploadStatusSuccess(responseData));
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
}

export default projectDashboardWatcher;
