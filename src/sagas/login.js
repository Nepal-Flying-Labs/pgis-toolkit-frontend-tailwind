/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import loginUser from '@Services/login';
import loginActions, { Types } from '@Actions/login';
import toastActions from '@Actions/toast';

export function* loginRequest(action) {
  const { type, payload } = action;
  try {
    const response = yield call(loginUser, payload);
    localStorage.setItem('token', response.data.token);
    yield put(loginActions.loginSuccess({ data: response.data }));
    yield put(toastActions.success({ message: 'Logged In successfully.' }));
    yield put(push('/'));
  } catch (error) {
    yield put(loginActions.loginFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* logoutRequest(action) {
  const { type, payload } = action;
  try {
    localStorage.clear();
    yield put(loginActions.logoutSuccess());
    yield put(push('/login'));
    yield put(
      toastActions.success({ message: 'You logged out successfully.' }),
    );
  } catch (error) {
    yield put(loginActions.logoutFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* loginWatcher() {
  yield takeLatest(Types.LOGIN_REQUEST, loginRequest);
  yield takeLatest(Types.LOGOUT_REQUEST, logoutRequest);
}

export default loginWatcher;
