import { all } from 'redux-saga/effects';
import authenticationWatcher from './authentication';
import organizationsWatcher from './organizations';
import organizationDashboardWatcher from './organizationDashboard';

function* rootSaga() {
  yield all([
    authenticationWatcher(),
    organizationsWatcher(),
    organizationDashboardWatcher(),
  ]);
}

export default rootSaga;
