/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { loginUser } from '@Services/authentication';
import authActions, { Types } from '@Actions/authentication';
import toastActions from '@Actions/toast';

export function* loginRequest({ payload }) {
  try {
    const response = yield call(loginUser, payload);
    console.log(response, 'resx');
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userToken', response.data.access);
    // yield put(authActions.loginSuccess(response.data));
    // localStorage.setItem('token', response.data.token);
    // yield put(authActions.loginSuccess({ data: response.data }));
    // yield put(toastActions.success({ message: 'Logged In successfully.' }));
    // yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* authenticationWatcher() {
  yield takeLatest(Types.LOGIN_REQUEST, loginRequest);
}

export default authenticationWatcher;
