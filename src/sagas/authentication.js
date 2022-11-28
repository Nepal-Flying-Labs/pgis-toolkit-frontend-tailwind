import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  loginUser,
  signUpUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  getUserPermissions,
} from '@Services/authentication';
import authActions, { Types } from '@Actions/authentication';
import organizationsActions from '@Actions/organizations';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withLoader } from '@Utils/sagaUtils';

export function* loginRequest({ payload }) {
  try {
    const response = yield call(loginUser, payload);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userToken', response.data.access);
    yield put(authActions.loginSuccess(response.data));
    yield put(authActions.setInfoDialogContent(''));
    yield put(organizationsActions.toggleModal('access-to-functionalities'));
    yield put(push('/organizations'));
  } catch (error) {
    yield put(authActions.loginFailure());
    yield put(
      authActions.setInfoDialogContent({
        message: error?.response?.data?.detail,
        status: 'error',
      }),
    );
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
function* logoutRequest() {
  try {
    localStorage.clear();
    yield put(authActions.logoutSuccess());
    yield put(push('/login'));
    yield put(
      toastActions.success({ message: 'You logged out successfully.' }),
    );
  } catch (error) {
    yield put(authActions.logoutFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}
function* forgotPasswordRequest({ payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(forgotPassword, formdata);
    yield put(authActions.forgotPasswordSuccess());
    yield put(push('/login'));
    yield put(
      authActions.setInfoDialogContent({
        message: 'A reset link has been sent to your email.',
        status: 'success',
      }),
    );
  } catch (error) {
    yield put(authActions.forgotPasswordFailure());
    yield put(
      authActions.setInfoDialogContent({
        message: error?.response?.data?.message,
        status: 'error',
      }),
    );
  }
}

function* resetPasswordRequest({ params, payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(resetPassword, params, formdata);
    yield put(authActions.resetPasswordSuccess());
    yield put(push('/login'));
    yield put(
      authActions.setInfoDialogContent({
        message: 'Your password has been reset successfully.',
        status: 'success',
      }),
    );
  } catch (error) {
    yield put(authActions.resetPasswordFailure());
    yield put(
      authActions.setInfoDialogContent({
        message: error?.response?.data?.message,
        status: 'error',
      }),
    );
  }
}

function* getUserPermissionsRequest({ params }) {
  try {
    const response = yield call(getUserPermissions, params);
    yield put(authActions.getUserPermissionsSuccess(response.data));
  } catch (error) {
    yield put(authActions.getUserPermissionsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* authenticationWatcher() {
  yield takeLatest(Types.LOGIN_REQUEST, withLoader(loginRequest));
  yield takeLatest(Types.SIGN_UP_REQUEST, withLoader(signUpRequest));
  yield takeLatest(Types.VERIFY_USER_REQUEST, withLoader(verifyUserRequest));
  yield takeLatest(Types.LOGOUT_REQUEST, withLoader(logoutRequest));
  yield takeLatest(
    Types.FORGOT_PASSWORD_REQUEST,
    withLoader(forgotPasswordRequest),
  );
  yield takeLatest(
    Types.RESET_PASSWORD_REQUEST,
    withLoader(resetPasswordRequest),
  );
  yield takeLatest(
    Types.GET_USER_PERMISSIONS_REQUEST,
    withLoader(getUserPermissionsRequest),
  );
}

export default authenticationWatcher;
