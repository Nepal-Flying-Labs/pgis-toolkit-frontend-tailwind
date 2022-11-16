import { call, put, takeLatest } from 'redux-saga/effects';
import { getOrganizations } from '@Services/organizations';
import organizationsActions, { Types } from '@Actions/organizations';
import toastActions from '@Actions/toast';

export function* getOrganizationsRequest() {
  try {
    const response = yield call(getOrganizations);
    yield put(organizationsActions.getOrganizationsSuccess(response.data));
  } catch (error) {
    yield put(organizationsActions.getOrganizationsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* organizationsWatcher() {
  yield takeLatest(Types.GET_ORGANIZATIONS_REQUEST, getOrganizationsRequest);
}

export default organizationsWatcher;
