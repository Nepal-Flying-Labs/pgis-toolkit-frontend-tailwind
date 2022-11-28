import { all } from 'redux-saga/effects';
import authenticationWatcher from './authentication';
import organizationsWatcher from './organizations';
import organizationDashboardWatcher from './organizationDashboard';
import projectDashboardWatcher from './projectDashboard';

function* rootSaga() {
  yield all([
    authenticationWatcher(),
    organizationsWatcher(),
    organizationDashboardWatcher(),
    projectDashboardWatcher(),
  ]);
}

export default rootSaga;
