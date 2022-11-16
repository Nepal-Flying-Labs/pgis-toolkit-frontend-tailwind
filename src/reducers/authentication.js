import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  user: {},
};

const loginSuccess = (state, action) => ({
  ...state,
  loading: false,
  user: action.payload.data,
});

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
});

export default persist('user', ['user'], authenticationReducer);
