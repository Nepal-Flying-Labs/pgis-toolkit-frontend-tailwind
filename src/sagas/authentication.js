/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { loginUser } from '@Services/authentication';
import authActions, { Types } from '@Actions/authentication';
import toastActions from '@Actions/toast';

export function* loginRequest({ payload }) {
  try {
    const response = yield call(loginUser, payload);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userToken', response.data.access);
    yield put(authActions.loginSuccess(response.data));
    yield put(push('/organizations'));
  } catch (error) {
    yield put(authActions.loginFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* authenticationWatcher() {
  yield takeLatest(Types.LOGIN_REQUEST, loginRequest);
}

export default authenticationWatcher;
