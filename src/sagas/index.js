import { all } from 'redux-saga/effects';
import authenticationWatcher from './authentication';
import organizationsWatcher from './organizations';
import organizationDashboardWatcher from './organizationDashboard';
import projectDashboardWatcher from './projectDashboard';
import projectMapWatcher from './projectMap';
import usersWatcher from './users';

function* rootSaga() {
  yield all([
    authenticationWatcher(),
    organizationsWatcher(),
    organizationDashboardWatcher(),
    projectDashboardWatcher(),
    projectMapWatcher(),
    usersWatcher(),
  ]);
}

export default rootSaga;
