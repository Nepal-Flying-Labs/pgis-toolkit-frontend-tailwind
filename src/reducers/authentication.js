import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  user: {},
  userDetail: {},
  userPermissions: null,
};

const loginSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const verifyUserSuccess = (state, action) => ({
  ...state,
  userDetail: action.payload,
});

const getUserPermissionsSuccess = (state, action) => ({
  ...state,
  userPermissions: action.payload.permissions,
});

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
  [Types.GET_USER_PERMISSIONS_SUCCESS]: getUserPermissionsSuccess,
});

export default persist('user', ['user'], authenticationReducer);
