import { all } from 'redux-saga/effects';
import authenticationWatcher from './authentication';
import organizationsWatcher from './organizations';

function* rootSaga() {
  yield all([authenticationWatcher(), organizationsWatcher()]);
}

export default rootSaga;
