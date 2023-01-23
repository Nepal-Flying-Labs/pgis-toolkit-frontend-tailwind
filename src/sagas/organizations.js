import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createOrganization,
  getOrganizations,
  deleteOrganization,
} from '@Services/organizations';
import commonActions from '@Actions/common';
import organizationsActions, { Types } from '@Actions/organizations';
// import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';

export function* getOrganizationsRequest({ params }) {
  try {
    const response = yield call(getOrganizations, params);
    yield put(organizationsActions.getOrganizationsSuccess(response.data));
  } catch (error) {
    yield put(organizationsActions.getOrganizationsFailure());
    throw error;
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
    yield put(commonActions.toggleModal('create-organization-success'));
    yield put(organizationsActions.getOrganizationsRequest());
  } catch (error) {
    yield put(organizationsActions.createOrganizationFailure());
    throw error;
  }
}

export function* deleteOrganizationRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(deleteOrganization, id, formdata);
    yield put(organizationsActions.deleteOrganizationSuccess(response.data));
    yield put(commonActions.togglePromptDialog());

    // yield put(organizationsActions.getOrganizationsRequest());
  } catch (error) {
    yield put(organizationsActions.deleteOrganizationFailure());
    throw error;
  }
}

function* organizationsWatcher() {
  yield takeLatest(
    Types.GET_ORGANIZATIONS_REQUEST,
    withLoader(withErrorHandler(getOrganizationsRequest)),
  );
  yield takeLatest(
    Types.CREATE_ORGANIZATION_REQUEST,
    withLoader(withErrorHandler(createOrganizationRequest)),
  );
  yield takeLatest(
    Types.DELETE_ORGANIZATION_REQUEST,
    withLoader(withErrorHandler(deleteOrganizationRequest)),
  );
}

export default organizationsWatcher;
