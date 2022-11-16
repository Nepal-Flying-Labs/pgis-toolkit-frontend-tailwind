import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  loading: false,
  user: {},
};

const loginRequest = state => ({ ...state, loading: true });

const loginSuccess = (state, action) => ({
  ...state,
  loading: false,
  user: action.payload.data,
});

const loginFailure = state => ({
  ...state,
  loading: false,
});

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
});

export default persist('user', ['user'], authenticationReducer);
