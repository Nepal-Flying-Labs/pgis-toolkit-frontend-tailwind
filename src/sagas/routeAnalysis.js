/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from 'redux-saga/effects';
// import {
//   checkError,
//   copyFeatures,
// } from '@Services/routeAnalysis';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { optimumRouteAnalysis } from '@Services/routeAnalysis';

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

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.COPY_DATA_CLEANING_STATE_REQUEST,
    withLoader(withErrorHandler(copyDataCleaningStateRequest)),
  );
  yield takeLatest(
    Types.APPLY_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyRouteAnalysisRequest)),
  );
}

export default routeAnalysisWatcher;
