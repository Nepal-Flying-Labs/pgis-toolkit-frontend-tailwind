/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
// import {
//   checkError,
//   copyFeatures,
// } from '@Services/routeAnalysis';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* checkErrorRequest({ payload }) {
  try {
    yield put(routeAnalysisActions.setErrorStates());
  } catch (error) {
    yield put(routeAnalysisActions.checkErrorFailure());
    throw error;
  }
}

function* routeAnalysisWatcher() {
  // yield takeLatest(
  //   Types.CHECK_ERROR_REQUEST,
  //   withLoader(withErrorHandler(checkErrorRequest)),
  // );
}

export default routeAnalysisWatcher;
