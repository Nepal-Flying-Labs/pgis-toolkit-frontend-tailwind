import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  user: {},
  userDetail: {},
  userProfile: {},
  infoDialogContent: null,
  userPermissions: null,
  userGroup: null,
};

const loginSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const verifyUserSuccess = (state, action) => ({
  ...state,
  userDetail: action.payload,
});

const setInfoDialogContent = (state, action) => ({
  ...state,
  infoDialogContent: action.payload,
});

const getUserPermissionsSuccess = (state, action) => ({
  ...state,
  userPermissions: action.payload.permissions,
});

const getUserGroupSuccess = (state, action) => ({
  ...state,
  userGroup: action.payload,
});

const getUserProfileSuccess = (state, action) => ({
  ...state,
  userProfile: action.payload,
});

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
  [Types.SET_INFO_DIALOG_CONTENT]: setInfoDialogContent,
  [Types.GET_USER_PERMISSIONS_SUCCESS]: getUserPermissionsSuccess,
  [Types.GET_USER_GROUP_SUCCESS]: getUserGroupSuccess,
  [Types.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,
});

export default persist('user', ['user'], authenticationReducer);
