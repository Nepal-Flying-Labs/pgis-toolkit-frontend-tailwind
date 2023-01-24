import { call, put, takeLatest, delay } from 'redux-saga/effects';
import analysisActions, { Types } from '@Actions/analysis';
import bufferAnalysisActions from '@Actions/bufferAnalysis';
import toastActions from '@Actions/toast';
import {
  getAnalysisLayer,
  getAnalysisTaskResponse,
} from '@Services/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* checkProcessingStatusRequest({ payload }) {
  const { projectId, taskId, analysisType } = payload;
  const action =
    analysisType === 'buffer-analysis'
      ? bufferAnalysisActions
      : analysisActions;

  try {
    let responseData = { status: 'processing' };
    while (responseData?.status === 'processing') {
      yield delay(5 * 1000); // call api in 5 second interval
      const response = yield call(getAnalysisTaskResponse, { task_id: taskId });
      responseData = response.data;
    }
    if (responseData.status === 'route_not_found') {
      yield put(toastActions.error({ message: 'Route not found!' }));
      return;
    }
    if (responseData.status === 'success') {
      const params = {
        project: projectId,
        analysis_id: responseData.analysis_id,
      };
      const analysisResponse = yield call(getAnalysisLayer, params);

      console.log(analysisResponse, 'analysis response');
      console.log(action, 'action name');

      yield put(action.checkProcessingStatusSuccess(analysisResponse.data));
    }
  } catch (error) {
    yield put(action.checkProcessingStatusFailure());
    throw error;
  }
}

function* analysisWatcher() {
  yield takeLatest(
    Types.CHECK_PROCESSING_STATUS_REQUEST,
    withLoader(withErrorHandler(checkProcessingStatusRequest)),
  );
}

export default analysisWatcher;
