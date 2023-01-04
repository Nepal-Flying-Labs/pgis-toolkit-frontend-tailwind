import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser } from '@Services/analysis';
import analysisActions, { Types } from '@Actions/analysis';
// import commonActions from '@Actions/common';
// import toastActions from '@Actions/toast';
// import prepareFormData from '@Utils/prepareFormData';
// import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

// export function* loginRequest({ payload }) {
//   try {
//     const response = yield call(loginUser, payload);
//     yield put(commonActions.toggleModal('access-to-functionalities'));
//   } catch (error) {
//     yield put(authActions.loginFailure());
//   }
// }

function* analysisWatcher() {
  // yield takeLatest(Types.LOGIN_REQUEST, withLoader(loginRequest));
}

export default analysisWatcher;
