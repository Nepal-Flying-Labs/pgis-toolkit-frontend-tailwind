import {
  call,
  all,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import bufferAnalysisActions, { Types } from '@Actions/bufferAnalysis';
import commonActions from '@Actions/common';
import { getFeatureCollection, updateLayer } from '@Services/projectMap';
import toastActions from '@Actions/toast';

import analysisActions from '@Actions/analysis';
import prepareFormData from '@Utils/prepareFormData';
// import toastActions from '@Actions/toast';
import {
  applyBufferAnalysis,
  getBufferAnalysisData,
  getBufferAreaCollection,
  saveBufferLayer,
  getFeatureCollectionMirror,
  downloadBufferAnalysis,
  deleteBufferResult,
} from '@Services/bufferAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { copyFeatures } from '@Services/dataCleaning';

export function* applyBufferAnalysisRequest({ payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(applyBufferAnalysis, formData);
    yield put(
      analysisActions.setAnalysisState({
        analysisTaskId: response.data.task_id,
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.applyBufferAnalysisFailure());
    throw error;
  }
}
export function* copyFeaturesRequest({ payload }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield all(
      payload.map(item =>
        call(copyFeatures, { layer: item, reset_data: true }),
      ),
    );
    // const response = yield call(copyFeatures, payload);
    yield put(
      bufferAnalysisActions.copyFeaturesSuccess({
        data: response.data,
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.copyFeaturesFailure());
    throw error;
  }
}
export function* getDetailsCategoryRequest({ params }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield call(getBufferAnalysisData, params);
    yield put(
      bufferAnalysisActions.getDetailsCategorySuccess({
        data: response.data,
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.getDetailsCategoryFailure());
    throw error;
  }
}
export function* getDetailsChartRequest({ params }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield call(getBufferAnalysisData, params);
    yield put(
      bufferAnalysisActions.getDetailsChartSuccess({
        data: response.data,
        key: params?.view,
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.getDetailsChartFailure());
    throw error;
  }
}

export function* getAnalysisDataRequest({ params }) {
  try {
    const response = yield call(getBufferAreaCollection, params);
    yield put(bufferAnalysisActions.getAnalysisDataSuccess(response.data));
  } catch (error) {
    yield put(bufferAnalysisActions.getAnalysisDataFailure());
    throw error;
  }
}

export function* getSelectedLayerFeatureRequest() {
  try {
    const { attributeList } = yield select(
      state => state.analysis.layerAttributesList,
    );
    const selectedFeature = attributeList.filter(item => item.checked);
    const response = yield all(
      selectedFeature.map(feature => call(getFeatureCollection, feature.id)),
    );
    const newResponse = response.map(res => res.data);
    yield put(
      bufferAnalysisActions.getSelectedLayerFeatureSuccess(newResponse),
    );
    yield put(commonActions.toggleModal());
  } catch (error) {
    yield put(bufferAnalysisActions.getSelectedLayerFeatureFailure());
    throw error;
  }
}

export function* saveBufferLayerRequest({ payload }) {
  try {
    const { style, ...newPayload } = payload;
    const response = yield call(saveBufferLayer, newPayload);
    const responseData = response.data;
    yield put(commonActions.togglePromptDialog());
    const { layers } = yield select(state => state.analysis);
    const { theme, layer } = responseData;
    // eslint-disable-next-line no-unused-expressions
    yield call(updateLayer, layer, prepareFormData({ style }));
    yield put(
      analysisActions.setAnalysisState({
        layers: {
          ...layers,
          [theme]: [
            {
              ...responseData,
              checked: true,
              layer_type: 'Vector',
              id: layer,
              style,
            },
            ...layers[theme],
          ],
        },
        zoomToLayerId: layer,
      }),
    );
    yield put(
      bufferAnalysisActions.saveBufferLayerSuccess({
        ...responseData,
        analysisId: payload.analysis,
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.saveBufferLayerFailure());
    throw error;
  }
}

export function* getFeatureCollectionRequest({ params }) {
  try {
    const response = yield call(getFeatureCollectionMirror, params);
    yield put(bufferAnalysisActions.getFeatureCollectionSuccess(response.data));
  } catch (error) {
    console.log(error, 'error');
    yield put(bufferAnalysisActions.getFeatureCollectionFailure());
    throw error;
  }
}

export function* downloadBufferAnalysisRequest({ params }) {
  try {
    console.log(params);
    const response = yield call(downloadBufferAnalysis, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BufferAnalysis.zip';
    link.click();
    yield put(toastActions.success({ message: 'Export Completed.' }));
  } catch (error) {
    yield put(bufferAnalysisActions.downloadBufferAnalysisFailure());
    throw error;
  }
}

export function* deleteBufferResultRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(deleteBufferResult, id, formData);
    yield put(bufferAnalysisActions.deleteBufferResultSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(
      toastActions.success({
        message: 'Result deleted successfully.',
      }),
    );
  } catch (error) {
    yield put(bufferAnalysisActions.deleteBufferResultFailure());
  }
}

function* bufferAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_BUFFER_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyBufferAnalysisRequest)),
  );
  yield takeLatest(
    Types.COPY_FEATURES_REQUEST,
    withLoader(withErrorHandler(copyFeaturesRequest)),
  );
  yield takeLatest(
    Types.GET_DETAILS_CATEGORY_REQUEST,
    withLoader(withErrorHandler(getDetailsCategoryRequest)),
  );
  yield takeEvery(
    Types.GET_DETAILS_CHART_REQUEST,
    withLoader(withErrorHandler(getDetailsChartRequest)),
  );
  yield takeLatest(
    Types.GET_ANALYSIS_DATA_REQUEST,
    withLoader(withErrorHandler(getAnalysisDataRequest)),
  );
  yield takeLatest(
    Types.GET_SELECTED_LAYER_FEATURE_REQUEST,
    withLoader(withErrorHandler(getSelectedLayerFeatureRequest)),
  );
  yield takeLatest(
    Types.SAVE_BUFFER_LAYER_REQUEST,
    withLoader(withErrorHandler(saveBufferLayerRequest)),
  );
  yield takeLatest(
    Types.GET_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(getFeatureCollectionRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_BUFFER_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(downloadBufferAnalysisRequest)),
  );
  yield takeLatest(
    Types.DELETE_BUFFER_RESULT_REQUEST,
    withLoader(withErrorHandler(deleteBufferResultRequest)),
  );
}

export default bufferAnalysisWatcher;
