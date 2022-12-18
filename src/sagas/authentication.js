import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  loginUser,
  signUpUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  getUserPermissions,
  getLandingPage,
  getUserGroup,
  getUserProfile,
} from '@Services/authentication';
import authActions, { Types } from '@Actions/authentication';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withLoader } from '@Utils/sagaUtils';

export function* loginRequest({ payload }) {
  try {
    const response = yield call(loginUser, payload);

    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userToken', response.data.access);
    yield put(authActions.loginSuccess(response.data));
    const landingResponse = yield call(getLandingPage);
    yield put(authActions.setInfoDialogContent(null));
    yield put(push(`${landingResponse.data.page}`));
    yield put(commonActions.toggleModal('access-to-functionalities'));
  } catch (error) {
    yield put(authActions.loginFailure());
    yield put(
      authActions.setInfoDialogContent({
        message:
          error?.response?.data?.detail || error?.response?.data?.message,
        status: 'error',
      }),
    );
  }
}

export function* verifyUserRequest({ params }) {
  try {
    const response = yield call(verifyUser, params);
    if (response.data.user_created) {
      yield put(
        authActions.setInfoDialogContent({
          message:
            'To access your invited organization or project, please sign in.',
          status: 'success',
        }),
      );
      yield put(push('/login'));
    } else {
      yield put(authActions.verifyUserSuccess(response.data));
      yield put(
        authActions.setInfoDialogContent({
          message: 'Please Sign Up',
          status: 'success',
        }),
      );
      yield put(push('/sign-up'));
    }
  } catch (error) {
    yield put(authActions.verifyUserFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
    yield put(push('/login'));
  }
}

export function* signUpRequest({ payload }) {
  try {
    const formdata = prepareFormData(payload);
    yield call(signUpUser, formdata);
    yield put(commonActions.toggleModal('sign-up-success'));
    // yield put(push('/login'));
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

function* getUserGroupRequest() {
  try {
    const response = yield call(getUserGroup);
    yield put(authActions.getUserGroupSuccess(response.data));
  } catch (error) {
    yield put(authActions.getUserGroupFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* getLandingPageRequest() {
  try {
    yield delay(500);
    const response = yield call(getLandingPage);
    yield put(authActions.getLandingPageSuccess(response.data));
    yield put(push(`${response.data.page}`));
  } catch (error) {
    yield put(authActions.getLandingPageFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* getUserProfileRequest() {
  try {
    const response = yield call(getUserProfile);
    yield put(authActions.getUserProfileSuccess(response.data));
  } catch (error) {
    yield put(authActions.getUserProfileFailure());
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
  yield takeLatest(
    Types.GET_USER_GROUP_REQUEST,
    withLoader(getUserGroupRequest),
  );
  yield takeLatest(
    Types.GET_LANDING_PAGE_REQUEST,
    withLoader(getLandingPageRequest),
  );
  yield takeLatest(
    Types.GET_USER_PROFILE_REQUEST,
    withLoader(getUserProfileRequest),
  );
}

export default authenticationWatcher;
