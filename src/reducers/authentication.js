import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/authentication';
import persist from '../utils/persist';

const initialState = {
  user: {},
  userDetail: {},
  infoDialogContent: null,
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

const authenticationReducer = createReducer(initialState, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.VERIFY_USER_SUCCESS]: verifyUserSuccess,
  [Types.SET_INFO_DIALOG_CONTENT]: setInfoDialogContent,
});

export default persist('user', ['user'], authenticationReducer);
