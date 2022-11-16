import { all } from 'redux-saga/effects';
import loginWatcher from './login';
import authenticationWatcher from './authentication';

function* rootSaga() {
  yield all([loginWatcher(), authenticationWatcher()]);
}

export default rootSaga;
