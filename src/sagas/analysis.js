import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { autoFixError, checkError } from '@Services/analysis';
import analysisActions, { Types } from '@Actions/analysis';
// import commonActions from '@Actions/common';
// import toastActions from '@Actions/toast';
// import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* checkErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    yield put(analysisActions.setErrorStates(layerId));
    const { errorStates } = yield select(state => state.analysis);
    const errorData = errorStates[layerId];
    for (let i = 0; i < errorData.length; i += 1) {
      const { id, checkAPI } = errorData[i];
      yield put(
        analysisActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'checking',
        }),
      );
      const response = yield call(checkError, checkAPI, params);
      yield put(
        analysisActions.checkErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(analysisActions.checkErrorFailure());
    throw error;
  }
}

export function* autoFixErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    const { errorStates } = yield select(state => state.analysis);
    const checkedErrorData = errorStates[layerId].filter(item => item.checked);
    for (let i = 0; i < checkedErrorData.length; i += 1) {
      const { id, fixAPI } = checkedErrorData[i];
      yield put(
        analysisActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'fixing',
        }),
      );
      const response = yield call(autoFixError, fixAPI, params);
      yield put(
        analysisActions.autoFixErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(analysisActions.autoFixErrorFailure());
    throw error;
  }
}

function* analysisWatcher() {
  yield takeEvery(
    Types.CHECK_ERROR_REQUEST,
    withLoader(withErrorHandler(checkErrorRequest)),
  );
  yield takeEvery(
    Types.AUTO_FIX_ERROR_REQUEST,
    withLoader(withErrorHandler(autoFixErrorRequest)),
  );
}

export default analysisWatcher;
