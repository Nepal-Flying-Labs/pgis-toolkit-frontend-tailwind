import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { loginUser, signUpUser, verifyUser } from '@Services/authentication';
import authActions, { Types } from '@Actions/authentication';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withLoader } from '@Utils/sagaUtils';

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

export function* verifyUserRequest({ params }) {
  try {
    const response = yield call(verifyUser, params);
    if (response.data.user_created) {
      yield put(push('/login'));
    } else {
      yield put(authActions.verifyUserSuccess(response.data));
      yield put(push('/sign-up'));
    }
  } catch (error) {
    yield put(authActions.verifyUserFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* signUpRequest({ payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(signUpUser, formdata);
    yield put(push('/login'));
  } catch (error) {
    yield put(authActions.signUpFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* authenticationWatcher() {
  yield takeLatest(Types.LOGIN_REQUEST, withLoader(loginRequest));
  yield takeLatest(Types.SIGN_UP_REQUEST, withLoader(signUpRequest));
  yield takeLatest(Types.VERIFY_USER_REQUEST, withLoader(verifyUserRequest));
}

export default authenticationWatcher;
