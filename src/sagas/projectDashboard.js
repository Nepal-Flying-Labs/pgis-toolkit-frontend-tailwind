import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  getMapPopupData,
  getProjectThemeLayers,
  getProjectThemes,
  uploadLayer,
} from '@Services/projectDashboard';
import projectDashboardActions, { Types } from '@Actions/projectDashboard';
import toastActions from '@Actions/toast';
import { withLoader } from '@Utils/sagaUtils';

export function* getProjectThemesRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectDashboardActions.getProjectThemesSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectThemesFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getProjectThemeLayersRequest({ params }) {
  try {
    const response = yield call(getProjectThemeLayers, params);
    yield put(
      projectDashboardActions.getProjectThemeLayersSuccess({
        data: response.data,
        theme: params.theme,
      }),
    );
  } catch (error) {
    yield put(projectDashboardActions.getProjectThemeLayersFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* uploadLayerRequest({ payload }) {
  try {
    const response = yield call(uploadLayer, payload);
    yield put(projectDashboardActions.uploadLayerSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.uploadLayerFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getMapPopupDataRequest({ params }) {
  try {
    const response = yield call(getMapPopupData, params);
    yield put(projectDashboardActions.getMapPopupDataSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getMapPopupDataFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* projectDashboardWatcher() {
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
}

export default projectDashboardWatcher;
