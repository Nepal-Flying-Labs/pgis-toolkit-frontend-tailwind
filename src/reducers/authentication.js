import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  user: {},
};

const loginSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const verifyUserSuccess = (state, action) => {
  return {
    ...state,
  };
};

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
});

export default persist('user', ['user'], authenticationReducer);
