import { call, put, takeLatest } from 'redux-saga/effects';
import { getProjects } from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import toastActions from '@Actions/toast';

export function* getProjectsRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getProjectsSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getProjectsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* organizationDashboardWatcher() {
  yield takeLatest(Types.GET_PROJECTS_REQUEST, getProjectsRequest);
}

export default organizationDashboardWatcher;
