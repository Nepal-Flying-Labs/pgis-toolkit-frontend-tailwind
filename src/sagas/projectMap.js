import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  getMapPopupData,
  getProjectThemeLayers,
  getProjectThemes,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import projectMapActions, { Types } from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import { withLoader } from '@Utils/sagaUtils';
import prepareFormData from '@Utils/prepareFormData';

export function* getProjectThemesRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectMapActions.getProjectThemesSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getProjectThemesFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getProjectThemeLayersRequest({ params }) {
  try {
    const response = yield call(getProjectThemeLayers, params);
    yield put(
      projectMapActions.getProjectThemeLayersSuccess({
        data: response.data,
        theme: params.theme,
      }),
    );
  } catch (error) {
    yield put(projectMapActions.getProjectThemeLayersFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* uploadLayerRequest({ payload }) {
  try {
    const response = yield call(uploadLayer, payload);
    yield put(projectMapActions.uploadLayerSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.uploadLayerFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getMapPopupDataRequest({ params }) {
  try {
    const response = yield call(getMapPopupData, params);
    yield put(projectMapActions.getMapPopupDataSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getMapPopupDataFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* updateLayerRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(
      projectMapActions.updateLayerSuccess({
        responseData: response.data,
        payload,
      }),
    );
  } catch (error) {
    yield put(projectMapActions.updateLayerFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* uploadIconRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectMapActions.uploadIconSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.uploadIconFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* deleteIconRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectMapActions.deleteIconSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.deleteIconFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

function* projectMapWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_THEMES_REQUEST,
    withLoader(getProjectThemesRequest),
  );
  yield takeEvery(
    Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    withLoader(getProjectThemeLayersRequest),
  );
  yield takeLatest(Types.UPLOAD_LAYER_REQUEST, withLoader(uploadLayerRequest));
  yield takeLatest(
    Types.GET_MAP_POPUP_DATA_REQUEST,
    withLoader(getMapPopupDataRequest),
  );
  yield takeLatest(Types.UPDATE_LAYER_REQUEST, withLoader(updateLayerRequest));
  yield takeLatest(Types.UPLOAD_ICON_REQUEST, withLoader(uploadIconRequest));
  yield takeLatest(Types.DELETE_ICON_REQUEST, withLoader(deleteIconRequest));
}

export default projectMapWatcher;
