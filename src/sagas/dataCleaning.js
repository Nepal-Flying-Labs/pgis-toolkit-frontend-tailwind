import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  autoFixError,
  checkError,
  copyFeatures,
  getErrorFeatures,
  updateFeatureCollection,
} from '@Services/dataCleaning';
import dataCleaningActions, { Types } from '@Actions/dataCleaning';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { getLayerAttributeFields } from '@Services/projectMap';

export function* checkErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    yield put(dataCleaningActions.setErrorStates(layerId));
    yield call(copyFeatures, { layer: layerId.toString() });
    const { errorStates } = yield select(state => state.dataCleaning);
    const errorData = errorStates[layerId];
    for (let i = 0; i < errorData.length; i += 1) {
      const { id, checkAPI } = errorData[i];
      yield put(
        dataCleaningActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'checking',
        }),
      );
      const response = yield call(checkError, checkAPI, params);
      yield put(
        dataCleaningActions.checkErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(dataCleaningActions.checkErrorFailure());
    throw error;
  }
}

export function* autoFixErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    const { errorStates } = yield select(state => state.dataCleaning);
    const checkedErrorData = errorStates[layerId].filter(item => item.checked);
    for (let i = 0; i < checkedErrorData.length; i += 1) {
      const { id, fixAPI } = checkedErrorData[i];
      yield put(
        dataCleaningActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'fixing',
        }),
      );
      const response = yield call(autoFixError, fixAPI, params);
      yield put(
        dataCleaningActions.autoFixErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(dataCleaningActions.autoFixErrorFailure());
    throw error;
  }
}

export function* getErrorFeaturesRequest({ params }) {
  try {
    const response = yield call(getErrorFeatures, params);
    yield put(dataCleaningActions.getErrorFeaturesSuccess(response.data));
  } catch (error) {
    yield put(dataCleaningActions.getErrorFeaturesFailure());
    throw error;
  }
}

export function* getLayerAttributeFieldsRequest({ params }) {
  try {
    const response = yield call(getLayerAttributeFields, params);
    yield put(
      dataCleaningActions.getLayerAttributeFieldsSuccess(response.data),
    );
  } catch (error) {
    yield put(dataCleaningActions.getLayerAttributeFieldsFailure());
    throw error;
  }
}

export function* updateFeatureCollectionRequest({ id, payload }) {
  try {
    const response = yield call(updateFeatureCollection, id, payload);
    yield put(
      dataCleaningActions.updateFeatureCollectionSuccess(response.data),
    );
  } catch (error) {
    yield put(dataCleaningActions.updateFeatureCollectionFailure());
    throw error;
  }
}

function* dataCleaningWatcher() {
  yield takeEvery(
    Types.CHECK_ERROR_REQUEST,
    withLoader(withErrorHandler(checkErrorRequest)),
  );
  yield takeEvery(
    Types.AUTO_FIX_ERROR_REQUEST,
    withLoader(withErrorHandler(autoFixErrorRequest)),
  );
  yield takeLatest(
    Types.GET_ERROR_FEATURES_REQUEST,
    withLoader(withErrorHandler(getErrorFeaturesRequest)),
  );
  yield takeLatest(
    Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    withLoader(withErrorHandler(getLayerAttributeFieldsRequest)),
  );
  yield takeLatest(
    Types.UPDATE_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(updateFeatureCollectionRequest)),
  );
}

export default dataCleaningWatcher;
