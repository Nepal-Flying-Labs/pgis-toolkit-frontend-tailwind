import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getProjects,
  postProjectInvite,
  getIndividualProject,
} from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';

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
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(organizationDashboardActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Invitation sent success' }));
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
  yield takeLatest(Types.GET_PROJECTS_REQUEST, getProjectsRequest);
  yield takeLatest(Types.POST_PROJECT_INVITE_REQUEST, postProjectInviteRequest);
  yield takeLatest(
    Types.GET_INDIVIDUAL_PROJECT_REQUEST,
    getIndividualProjectRequest,
  );
}

export default organizationDashboardWatcher;
