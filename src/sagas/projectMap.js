import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import chroma from 'chroma-js';
import {
  getLayerAttributeFields,
  getMapPopupData,
  getProjectThemeLayers,
  getProjectThemes,
  saveMapConfig,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import projectMapActions, { Types } from '@Actions/projectMap';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import { withLoader } from '@Utils/sagaUtils';
import prepareFormData from '@Utils/prepareFormData';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import { pointTypes } from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import { isEmpty } from '@Utils/commonUtils';

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
    const layersWithNoStyle = response.data.filter(item =>
      isEmpty(item.style || {}),
    );
    const payloadData = layersWithNoStyle.map(item => ({
      id: item.id,
      style: {
        ...defaultStyles,
        fillColor: chroma.random().hex(),
        fillOpacity: pointTypes.includes(item.geom_type)
          ? 100
          : defaultStyles.fillOpacity,
      },
    }));
    yield all(
      payloadData.map(item =>
        call(updateLayer, item.id, prepareFormData({ style: item.style })),
      ),
    );
    const data = response.data.map(item =>
      item.style
        ? { ...item }
        : { ...item, style: payloadData.find(i => i.id === item.id)?.style },
    );
    yield put(
      projectMapActions.getProjectThemeLayersSuccess({
        data,
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

export function* deleteLayerRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectMapActions.deleteLayerSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
  } catch (error) {
    yield put(projectMapActions.deleteLayerFailure());
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

export function* saveMapConfigRequest({ params, payload }) {
  try {
    const response = yield call(saveMapConfig, params, payload);
    yield put(projectMapActions.saveMapConfigSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.saveMapConfigFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getLayerAttributeFieldsRequest({ params }) {
  try {
    const response = yield call(getLayerAttributeFields, params);
    yield put(projectMapActions.getLayerAttributeFieldsSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getLayerAttributeFieldsFailure());
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
  yield takeLatest(Types.DELETE_LAYER_REQUEST, withLoader(deleteLayerRequest));
  yield takeLatest(Types.UPLOAD_ICON_REQUEST, withLoader(uploadIconRequest));
  yield takeLatest(Types.DELETE_ICON_REQUEST, withLoader(deleteIconRequest));
  yield takeLatest(
    Types.SAVE_MAP_CONFIG_REQUEST,
    withLoader(saveMapConfigRequest),
  );
  yield takeLatest(
    Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    withLoader(getLayerAttributeFieldsRequest),
  );
}

export default projectMapWatcher;
