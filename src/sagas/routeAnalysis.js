import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import {
  getAnalysisTaskResponse,
  optimumRouteAnalysis,
} from '@Services/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* copyDataCleaningStateRequest() {
  try {
    const { selectedLayer, selectedObstacleLayers } = yield select(
      state => state.routeAnalysis,
    );
    yield put(
      routeAnalysisActions.copyDataCleaningStateSuccess({
        roadNetworkLayer: selectedLayer,
        obstaclesLayers: selectedObstacleLayers,
      }),
    );
  } catch (error) {
    yield put(routeAnalysisActions.copyDataCleaningStateFailure());
    throw error;
  }
}

export function* applyRouteAnalysisRequest({ payload }) {
  try {
    const response = yield call(optimumRouteAnalysis, payload);
    yield put(routeAnalysisActions.applyRouteAnalysisSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.applyRouteAnalysisFailure());
    throw error;
  }
}

export function* checkProcessingStatusRequest({ params }) {
  try {
    let responseData = { message: 'processing' };
    while (responseData?.message === 'processing') {
      yield delay(5 * 1000); // call api in 5 second interval
      const response = yield call(getAnalysisTaskResponse, params);
      responseData = response.data;
      console.log(responseData, 'resx');
    }
    console.log(responseData, 'resxy');
    yield put(routeAnalysisActions.checkProcessingStatusSuccess(responseData));
  } catch (error) {
    yield put(routeAnalysisActions.checkProcessingStatusFailure());
    throw error;
  }
}

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.COPY_DATA_CLEANING_STATE_REQUEST,
    withLoader(withErrorHandler(copyDataCleaningStateRequest)),
  );
  yield takeLatest(
    Types.APPLY_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyRouteAnalysisRequest)),
  );
  yield takeLatest(
    Types.CHECK_PROCESSING_STATUS_REQUEST,
    withLoader(withErrorHandler(checkProcessingStatusRequest)),
  );
}

export default routeAnalysisWatcher;
