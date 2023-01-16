import { call, put, takeLatest, delay } from 'redux-saga/effects';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import toastActions from '@Actions/toast';
import {
  getAnalysisLayer,
  getAnalysisTaskResponse,
  getNetworkRoute,
  optimumRouteAnalysis,
} from '@Services/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* applyRouteAnalysisRequest({ payload }) {
  try {
    const response = yield call(optimumRouteAnalysis, payload);
    yield put(routeAnalysisActions.applyRouteAnalysisSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.applyRouteAnalysisFailure());
    throw error;
  }
}

export function* checkProcessingStatusRequest({ payload }) {
  try {
    const { projectId, taskId } = payload;
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
      yield put(
        routeAnalysisActions.checkProcessingStatusSuccess(
          analysisResponse.data,
        ),
      );
    }
  } catch (error) {
    yield put(routeAnalysisActions.checkProcessingStatusFailure());
    throw error;
  }
}

export function* getRoutePopupDataRequest({ payload: id }) {
  try {
    const response = yield call(getNetworkRoute, id);
    yield put(routeAnalysisActions.getRoutePopupDataSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.getRoutePopupDataFailure());
    throw error;
  }
}

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyRouteAnalysisRequest)),
  );
  yield takeLatest(
    Types.CHECK_PROCESSING_STATUS_REQUEST,
    withLoader(withErrorHandler(checkProcessingStatusRequest)),
  );
  yield takeLatest(
    Types.GET_ROUTE_POPUP_DATA_REQUEST,
    withLoader(withErrorHandler(getRoutePopupDataRequest)),
  );
}

export default routeAnalysisWatcher;
