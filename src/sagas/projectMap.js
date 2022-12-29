import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import chroma from 'chroma-js';
import {
  getAdvanceQueryValues,
  getFeatureCollection,
  getLayerAttributeFields,
  getMapPopupData,
  getProjectGeojson,
  getProjectThemeLayers,
  getProjectThemes,
  postAdvanceQuery,
  postNewLayerFeature,
  saveDataQuery,
  saveMapConfig,
  updateFeatureCollection,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import projectMapActions, { Types } from '@Actions/projectMap';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import { withLoader, withErrorHandler } from '@Utils/sagaUtils';
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
    throw error;
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
    throw error;
  }
}

export function* uploadLayerRequest({ payload }) {
  try {
    const response = yield call(uploadLayer, payload);
    yield put(projectMapActions.uploadLayerSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.uploadLayerFailure());
    throw error;
  }
}

export function* getMapPopupDataRequest({ params }) {
  try {
    const response = yield call(getMapPopupData, params);
    yield put(projectMapActions.getMapPopupDataSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getMapPopupDataFailure());
    throw error;
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
    throw error;
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
    throw error;
  }
}

export function* uploadIconRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectMapActions.uploadIconSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.uploadIconFailure());
    throw error;
  }
}

export function* deleteIconRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateLayer, id, formdata);
    yield put(projectMapActions.deleteIconSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.deleteIconFailure());
    throw error;
  }
}

export function* saveMapConfigRequest({ params, payload }) {
  try {
    const response = yield call(saveMapConfig, params, payload);
    yield put(projectMapActions.saveMapConfigSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.saveMapConfigFailure());
    throw error;
  }
}

export function* getLayerAttributeFieldsRequest({ params }) {
  try {
    const response = yield call(getLayerAttributeFields, params);
    yield put(projectMapActions.getLayerAttributeFieldsSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getLayerAttributeFieldsFailure());
    throw error;
  }
}

export function* postNewLayerFeatureRequest({ payload }) {
  try {
    const response = yield call(postNewLayerFeature, payload);
    yield put(projectMapActions.postNewLayerFeatureSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.postNewLayerFeatureFailure());
    throw error;
  }
}

export function* getFeatureCollectionRequest({ id }) {
  try {
    const response = yield call(getFeatureCollection, id);
    yield put(projectMapActions.getFeatureCollectionSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getFeatureCollectionFailure());
    throw error;
  }
}

export function* updateFeatureCollectionRequest({ id, payload }) {
  try {
    const response = yield call(updateFeatureCollection, id, payload);
    yield put(projectMapActions.updateFeatureCollectionSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.updateFeatureCollectionFailure());
    throw error;
  }
}

export function* getProjectGeojsonRequest({ params }) {
  try {
    const response = yield call(getProjectGeojson, params);
    yield put(projectMapActions.getProjectGeojsonSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getProjectGeojsonFailure());
    throw error;
  }
}

export function* getDataQueryFieldsRequest({ params }) {
  try {
    const response = yield call(getAdvanceQueryValues, params);
    yield put(projectMapActions.getDataQueryFieldsSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getDataQueryFieldsFailure());
    throw error;
  }
}

export function* getDataQueryValuesRequest({ params }) {
  try {
    const response = yield call(getAdvanceQueryValues, params);
    yield put(projectMapActions.getDataQueryValuesSuccess(response.data));
  } catch (error) {
    yield put(projectMapActions.getDataQueryValuesFailure());
    throw error;
  }
}

export function* postAdvanceQueryRequest({ payload, data }) {
  try {
    const response = yield call(postAdvanceQuery, payload);
    yield put(
      projectMapActions.postAdvanceQuerySuccess({
        ...response.data,
        ...data,
      }),
    );
    yield put(commonActions.toggleModal());
  } catch (error) {
    yield put(projectMapActions.postAdvanceQueryFailure());
    throw error;
  }
}

export function* saveDataQueryRequest({ payload }) {
  try {
    const response = yield call(saveDataQuery, payload);
    yield put(projectMapActions.saveDataQuerySuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(
      toastActions.success({
        message: `${response.data.name} layer created successfully.`,
      }),
    );
  } catch (error) {
    yield put(projectMapActions.saveDataQueryFailure());
    throw error;
  }
}

function* projectMapWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_THEMES_REQUEST,
    withLoader(withErrorHandler(getProjectThemesRequest)),
  );
  yield takeEvery(
    Types.GET_PROJECT_THEME_LAYERS_REQUEST,
    withLoader(withErrorHandler(getProjectThemeLayersRequest)),
  );
  yield takeLatest(
    Types.UPLOAD_LAYER_REQUEST,
    withLoader(withErrorHandler(uploadLayerRequest)),
  );
  yield takeLatest(
    Types.GET_MAP_POPUP_DATA_REQUEST,
    withLoader(withErrorHandler(getMapPopupDataRequest)),
  );
  yield takeLatest(
    Types.UPDATE_LAYER_REQUEST,
    withLoader(withErrorHandler(updateLayerRequest)),
  );
  yield takeLatest(
    Types.DELETE_LAYER_REQUEST,
    withLoader(withErrorHandler(deleteLayerRequest)),
  );
  yield takeLatest(
    Types.UPLOAD_ICON_REQUEST,
    withLoader(withErrorHandler(uploadIconRequest)),
  );
  yield takeLatest(
    Types.DELETE_ICON_REQUEST,
    withLoader(withErrorHandler(deleteIconRequest)),
  );
  yield takeLatest(
    Types.SAVE_MAP_CONFIG_REQUEST,
    withLoader(withErrorHandler(saveMapConfigRequest)),
  );
  yield takeLatest(
    Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    withLoader(withErrorHandler(getLayerAttributeFieldsRequest)),
  );
  yield takeLatest(
    Types.POST_NEW_LAYER_FEATURE_REQUEST,
    withLoader(withErrorHandler(postNewLayerFeatureRequest)),
  );
  yield takeLatest(
    Types.GET_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(getFeatureCollectionRequest)),
  );
  yield takeLatest(
    Types.UPDATE_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(updateFeatureCollectionRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECT_GEOJSON_REQUEST,
    withLoader(withErrorHandler(getProjectGeojsonRequest)),
  );
  yield takeLatest(
    Types.GET_DATA_QUERY_FIELDS_REQUEST,
    withLoader(withErrorHandler(getDataQueryFieldsRequest)),
  );
  yield takeLatest(
    Types.GET_DATA_QUERY_VALUES_REQUEST,
    withLoader(withErrorHandler(getDataQueryValuesRequest)),
  );
  yield takeLatest(
    Types.POST_ADVANCE_QUERY_REQUEST,
    withLoader(withErrorHandler(postAdvanceQueryRequest)),
  );
  yield takeLatest(
    Types.SAVE_DATA_QUERY_REQUEST,
    withLoader(withErrorHandler(saveDataQueryRequest)),
  );
}

export default projectMapWatcher;
