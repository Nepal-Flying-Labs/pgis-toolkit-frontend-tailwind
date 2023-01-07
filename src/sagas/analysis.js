import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  autoFixError,
  checkError,
  copyFeatures,
  getErrorFeatures,
} from '@Services/analysis';
import analysisActions, { Types } from '@Actions/analysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { getLayerAttributeFields } from '@Services/projectMap';

export function* checkErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    yield put(analysisActions.setErrorStates(layerId));
    yield call(copyFeatures, { layer: layerId.toString() });
    const { errorStates } = yield select(state => state.analysis);
    const errorData = errorStates[layerId];
    for (let i = 0; i < errorData.length; i += 1) {
      const { id, checkAPI } = errorData[i];
      yield put(
        analysisActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'checking',
        }),
      );
      const response = yield call(checkError, checkAPI, params);
      yield put(
        analysisActions.checkErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(analysisActions.checkErrorFailure());
    throw error;
  }
}

export function* autoFixErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    const { errorStates } = yield select(state => state.analysis);
    const checkedErrorData = errorStates[layerId].filter(item => item.checked);
    for (let i = 0; i < checkedErrorData.length; i += 1) {
      const { id, fixAPI } = checkedErrorData[i];
      yield put(
        analysisActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'fixing',
        }),
      );
      const response = yield call(autoFixError, fixAPI, params);
      yield put(
        analysisActions.autoFixErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(analysisActions.autoFixErrorFailure());
    throw error;
  }
}

export function* getErrorFeaturesRequest({ params }) {
  try {
    const response = yield call(getErrorFeatures, params);
    yield put(analysisActions.getErrorFeaturesSuccess(response.data));
  } catch (error) {
    yield put(analysisActions.getErrorFeaturesFailure());
    throw error;
  }
}

export function* getLayerAttributeFieldsRequest({ params }) {
  try {
    const response = yield call(getLayerAttributeFields, params);
    yield put(analysisActions.getLayerAttributeFieldsSuccess(response.data));
  } catch (error) {
    yield put(analysisActions.getLayerAttributeFieldsFailure());
    throw error;
  }
}

function* analysisWatcher() {
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
}

export default analysisWatcher;
