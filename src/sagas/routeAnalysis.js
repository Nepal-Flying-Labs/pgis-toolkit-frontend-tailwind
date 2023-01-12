/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from 'redux-saga/effects';
// import {
//   checkError,
//   copyFeatures,
// } from '@Services/routeAnalysis';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
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

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.COPY_DATA_CLEANING_STATE_REQUEST,
    withLoader(withErrorHandler(copyDataCleaningStateRequest)),
  );
}

export default routeAnalysisWatcher;
