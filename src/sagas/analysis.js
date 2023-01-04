import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { checkError } from '@Services/analysis';
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
      const { apiEndPoint } = errorData[i];
      yield put(
        analysisActions.setErrorCheckingStatus({
          layerId,
          apiEndPoint,
          status: 'checking',
        }),
      );
      const response = yield call(checkError, apiEndPoint, params);
      yield put(
        analysisActions.checkErrorSuccess({
          ...response.data,
          apiEndPoint,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(analysisActions.checkErrorFailure());
    throw error;
  }
}

function* analysisWatcher() {
  yield takeLatest(
    Types.CHECK_ERROR_REQUEST,
    withLoader(withErrorHandler(checkErrorRequest)),
  );
}

export default analysisWatcher;
