import { all } from 'redux-saga/effects';
import loginWatcher from './login';
import authenticationWatcher from './authentication';
import organizationsWatcher from './organizations';

function* rootSaga() {
  yield all([loginWatcher(), authenticationWatcher(), organizationsWatcher()]);
}

export default rootSaga;
