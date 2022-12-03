import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getProjects,
  postProjectInvite,
  getIndividualProject,
  getOrganizationDetail,
} from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withLoader } from '@Utils/sagaUtils';

export function* getOrganizationDetailRequest({ id }) {
  try {
    const response = yield call(getOrganizationDetail, id);
    yield put(
      organizationDashboardActions.getOrganizationDetailSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getOrganizationDetailFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getProjectsRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getProjectsSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getProjectsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* postProjectInviteRequest({ payload }) {
  const { organization } = payload;
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(organizationDashboardActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Invitation sent success' }));
    yield put(
      organizationDashboardActions.getProjectsRequest({ organization }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getIndividualProjectRequest({ id }) {
  try {
    const response = yield call(getIndividualProject, id);
    yield put(
      organizationDashboardActions.getIndividualProjectSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getIndividualProjectFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* organizationDashboardWatcher() {
  yield takeLatest(
    Types.GET_ORGANIZATION_DETAIL_REQUEST,
    withLoader(getOrganizationDetailRequest),
  );
  yield takeLatest(Types.GET_PROJECTS_REQUEST, getProjectsRequest);
  yield takeLatest(Types.POST_PROJECT_INVITE_REQUEST, postProjectInviteRequest);
  yield takeLatest(
    Types.GET_INDIVIDUAL_PROJECT_REQUEST,
    getIndividualProjectRequest,
  );
}

export default organizationDashboardWatcher;
