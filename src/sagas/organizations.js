import { call, put, takeLatest } from 'redux-saga/effects';
import { createOrganization, getOrganizations } from '@Services/organizations';
import organizationsActions, { Types } from '@Actions/organizations';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';

export function* getOrganizationsRequest({ params }) {
  try {
    const response = yield call(getOrganizations, params);
    yield put(organizationsActions.getOrganizationsSuccess(response.data));
  } catch (error) {
    yield put(organizationsActions.getOrganizationsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* createOrganizationRequest({ payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(createOrganization, formdata);
    yield put(
      organizationsActions.createOrganizationSuccess({
        ...payload,
        organizationId: response.data.organization,
      }),
    );
    yield put(organizationsActions.getOrganizationsRequest());
  } catch (error) {
    yield put(organizationsActions.createOrganizationFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* organizationsWatcher() {
  yield takeLatest(Types.GET_ORGANIZATIONS_REQUEST, getOrganizationsRequest);
  yield takeLatest(
    Types.CREATE_ORGANIZATION_REQUEST,
    createOrganizationRequest,
  );
}

export default organizationsWatcher;
