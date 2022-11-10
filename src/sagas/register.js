import { call, put, takeLatest } from 'redux-saga/effects';
import registerUser from '@Services/register';
import registerActions, { Types } from '@Actions/register';
import toastActions from '@Actions/toast';
import loaderActions from '@Actions/loader.actions';

export function* registerUserRequest(action) {
  const { type, payload } = action;
  try {
    yield put(
      loaderActions.startAction({
        action: {
          name: type,
          params: payload,
        },
      }),
    );
    yield call(registerUser, payload);
    yield put(registerActions.registerUserSuccess());
    yield put(toastActions.success({ message: 'You have been registered successfully.' }));
  } catch (error) {
    yield put(registerActions.registerUserFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  } finally {
    yield put(
      loaderActions.stopAction({
        name: type,
      }),
    );
  }
}

function* registerWatcher() {
  yield takeLatest(Types.REGISTER_USER_REQUEST, registerUserRequest);
}

export default registerWatcher;
