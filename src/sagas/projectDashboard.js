import { call, put, takeLatest } from 'redux-saga/effects';
import projectDashboardActions, { Types } from '@Actions/projectDashboard';
import projectMapActions from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import { getProjectDetail } from '@Services/projectDashboard';
import { withLoader } from '@Utils/sagaUtils';

export function* getProjectDetailRequest({ params }) {
  try {
    const response = yield call(getProjectDetail, params);
    yield put(projectDashboardActions.getProjectDetailSuccess(response.data));
    yield put(projectMapActions.setMapConfig(response.data.data.map_config));
  } catch (error) {
    yield put(projectDashboardActions.getProjectDetailFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

function* projectDashboardWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_DETAIL_REQUEST,
    withLoader(getProjectDetailRequest),
  );
}

export default projectDashboardWatcher;
