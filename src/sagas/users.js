import { call, put, takeLatest } from 'redux-saga/effects';
// import commonActions from '@Actions/common';
import usersActions, { Types } from '@Actions/users';
// import toastActions from '@Actions/toast';
// import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { getOrganization, getUsers } from '@Services/users';

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

function* usersWatcher() {
  yield takeLatest(
    Types.GET_USERS_REQUEST,
    withLoader(withErrorHandler(getUsersRequest)),
  );
  // yield takeLatest(
  //   Types.GET_ORGANIZATION_REQUEST,
  //   withLoader(withErrorHandler(getOrganizationRequest)),
  // );
}

export default usersWatcher;
