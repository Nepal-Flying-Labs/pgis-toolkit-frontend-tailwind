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
import { withLoader } from '@Utils/sagaUtils';
import {
  getProjectDetail,
  getLayers,
  getLayerById,
  getUploadErrorResponse,
  permanentDataDelete,
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
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getProjectLayersRequest({ params }) {
  try {
    const response = yield call(getLayers, params);
    yield put(projectDashboardActions.getProjectLayersSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectLayersFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getCategoryListRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectDashboardActions.getCategoryListSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getCategoryListFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
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
    yield put(toastActions.error({ message: error?.response?.data?.message }));
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
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
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
    yield put(commonActions.togglePromptDialog());
  } catch (error) {
    yield put(projectDashboardActions.checkUploadStatusFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getErrorDetailRequest({ params }) {
  try {
    const response = yield call(getUploadErrorResponse, params);
    yield put(projectDashboardActions.getErrorDetailSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getErrorDetailFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* permanentDataDeleteRequest({ id }) {
  try {
    yield call(permanentDataDelete, id);
    yield put(projectDashboardActions.permanentDataDeleteSuccess(id));
    yield put(toastActions.success({ message: 'Data deleted successfully.' }));
  } catch (error) {
    yield put(projectDashboardActions.permanentDataDeleteFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* updateDataRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(updateLayer, id, formdata);
    yield put(projectDashboardActions.updateDataSuccess());
  } catch (error) {
    yield put(projectDashboardActions.updateDataFailure(id));
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

function* projectDashboardWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_DETAIL_REQUEST,
    withLoader(getProjectDetailRequest),
  );
  yield takeLatest(
    Types.GET_PROJECT_LAYERS_REQUEST,
    withLoader(getProjectLayersRequest),
  );
  yield takeLatest(
    Types.GET_CATEGORY_LIST_REQUEST,
    withLoader(getCategoryListRequest),
  );
  yield takeLatest(
    Types.UPLOAD_DATASETS_REQUEST,
    withLoader(uploadDatasetsRequest),
  );
  yield takeLatest(Types.DELETE_DATA_REQUEST, withLoader(deleteDataRequest));
  yield takeEvery(
    Types.CHECK_UPLOAD_STATUS_REQUEST,
    withLoader(checkUploadStatusRequest),
  );
  yield takeLatest(
    Types.GET_ERROR_DETAIL_REQUEST,
    withLoader(getErrorDetailRequest),
  );
  yield takeLatest(
    Types.PERMANENT_DATA_DELETE_REQUEST,
    withLoader(permanentDataDeleteRequest),
  );
  yield takeLatest(Types.UPDATE_DATA_REQUEST, withLoader(updateDataRequest));
}

export default projectDashboardWatcher;
