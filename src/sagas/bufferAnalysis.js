import { call, all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import bufferAnalysisActions, { Types } from '@Actions/bufferAnalysis';
import analysisActions from '@Actions/analysis';
import prepareFormData from '@Utils/prepareFormData';
// import toastActions from '@Actions/toast';
import {
  applyBufferAnalysis,
  getBufferAnalysisData,
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
      payload.map(item => call(copyFeatures, { layer: item })),
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
}

export default bufferAnalysisWatcher;
