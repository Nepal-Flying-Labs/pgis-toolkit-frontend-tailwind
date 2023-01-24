import { call, put, takeLatest } from 'redux-saga/effects';
import routeAnalysisActions, { Types } from '@Actions/routeAnalysis';
import analysisActions from '@Actions/analysis';
import {
  getNetworkRoute,
  getNetworkRouteCollection,
  optimumRouteAnalysis,
} from '@Services/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* applyRouteAnalysisRequest({ payload }) {
  try {
    const response = yield call(optimumRouteAnalysis, payload);
    yield put(
      analysisActions.setAnalysisState({
        analysisTaskId: response.data.task_id,
      }),
    );
  } catch (error) {
    yield put(routeAnalysisActions.applyRouteAnalysisFailure());
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

export function* getAnalysisDataRequest({ params }) {
  try {
    const response = yield call(getNetworkRouteCollection, params);
    yield put(routeAnalysisActions.getAnalysisDataSuccess(response.data));
  } catch (error) {
    yield put(routeAnalysisActions.getAnalysisDataFailure());
    throw error;
  }
}

function* routeAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_ROUTE_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyRouteAnalysisRequest)),
  );
  yield takeLatest(
    Types.GET_ROUTE_POPUP_DATA_REQUEST,
    withLoader(withErrorHandler(getRoutePopupDataRequest)),
  );
  yield takeLatest(
    Types.GET_ANALYSIS_DATA_REQUEST,
    withLoader(withErrorHandler(getAnalysisDataRequest)),
  );
}

export default routeAnalysisWatcher;
