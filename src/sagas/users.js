import { call, put, takeLatest } from 'redux-saga/effects';
import commonActions from '@Actions/common';
import usersActions, { Types } from '@Actions/users';
import toastActions from '@Actions/toast';
// import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import {
  getOrganization,
  getUsers,
  updateInvitedUserStatus,
  updateUserRole,
} from '@Services/users';
import prepareFormData from '@Utils/prepareFormData';

export function* getUsersRequest({ params }) {
  try {
    const response = yield call(getUsers, params);
    yield put(usersActions.getUsersSuccess(response.data));
  } catch (error) {
    yield put(usersActions.getUsersFailure());
    throw error;
  }
}
export function* getOrganizationRequest({ params }) {
  try {
    const response = yield call(getOrganization, params);
    yield put(usersActions.getOrganizationSuccess(response.data));
  } catch (error) {
    yield put(usersActions.getOrganizationFailure());
    throw error;
  }
}

export function* updateUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(usersActions.updateUserStatusSuccess(response.data));
  } catch (error) {
    yield put(usersActions.updateUserStatusFailure());
    throw error;
  }
}

export function* deleteUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(usersActions.deleteUserSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(usersActions.deleteUserFailure());
    throw error;
  }
}

export function* updateInvitedUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(usersActions.updateInvitedUserStatusSuccess(response.data));
  } catch (error) {
    yield put(usersActions.updateInvitedUserStatusFailure());
    throw error;
  }
}

export function* deleteInvitedUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(usersActions.deleteInvitedUserSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(usersActions.deleteInvitedUserFailure());
    throw error;
  }
}

export function* resendInvitationRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(usersActions.resendInvitationSuccess(response.data));
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(usersActions.resendInvitationFailure());
    throw error;
  }
}

function* usersWatcher() {
  yield takeLatest(
    Types.GET_USERS_REQUEST,
    withLoader(withErrorHandler(getUsersRequest)),
  );
  yield takeLatest(
    Types.UPDATE_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_USER_REQUEST,
    withLoader(withErrorHandler(deleteUserRequest)),
  );
  yield takeLatest(
    Types.UPDATE_INVITED_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateInvitedUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_INVITED_USER_REQUEST,
    withLoader(withErrorHandler(deleteInvitedUserRequest)),
  );
  yield takeLatest(
    Types.RESEND_INVITATION_REQUEST,
    withLoader(withErrorHandler(resendInvitationRequest)),
  );
  // yield takeLatest(
  //   Types.GET_ORGANIZATION_REQUEST,
  //   withLoader(withErrorHandler(getOrganizationRequest)),
  // );
}

export default usersWatcher;
