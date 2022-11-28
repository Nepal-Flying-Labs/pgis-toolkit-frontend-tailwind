import { call, put, takeLatest } from 'redux-saga/effects';
import { getProjectThemes } from '@Services/projectDashboard';
import projectDashboardActions, { Types } from '@Actions/projectDashboard';
import toastActions from '@Actions/toast';

export function* getProjectThemesRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectDashboardActions.getProjectThemesSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectThemesFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* projectDashboardWatcher() {
  yield takeLatest(Types.GET_PROJECT_THEMES_REQUEST, getProjectThemesRequest);
}

export default projectDashboardWatcher;
