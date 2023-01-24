import { call, put, takeLatest } from 'redux-saga/effects';
import bufferAnalysisActions, { Types } from '@Actions/bufferAnalysis';
import prepareFormData from '@Utils/prepareFormData';
// import toastActions from '@Actions/toast';
import { applyBufferAnalysis } from '@Services/bufferAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* applyBufferAnalysisRequest({ payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(applyBufferAnalysis, formData);
    yield put(bufferAnalysisActions.applyBufferAnalysisSuccess(response.data));
  } catch (error) {
    yield put(bufferAnalysisActions.applyBufferAnalysisFailure());
    throw error;
  }
}

function* bufferAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_BUFFER_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyBufferAnalysisRequest)),
  );
}

export default bufferAnalysisWatcher;
