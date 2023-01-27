import { call, all, put, takeLatest } from 'redux-saga/effects';
import bufferAnalysisActions, { Types } from '@Actions/bufferAnalysis';
import analysisActions from '@Actions/analysis';
import prepareFormData from '@Utils/prepareFormData';
// import toastActions from '@Actions/toast';
import { applyBufferAnalysis } from '@Services/bufferAnalysis';
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

function* bufferAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_BUFFER_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyBufferAnalysisRequest)),
  );
  yield takeLatest(
    Types.COPY_FEATURES_REQUEST,
    withLoader(withErrorHandler(copyFeaturesRequest)),
  );
}

export default bufferAnalysisWatcher;
