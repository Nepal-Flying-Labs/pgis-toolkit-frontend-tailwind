import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['payload'],
  loginFailure: null,

  verifyUserRequest: ['params'],
  verifyUserSuccess: ['payload'],
  verifyUserFailure: null,

  signUpRequest: ['payload'],
  signUpSuccess: ['payload'],
  signUpFailure: null,

  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,

  forgotPasswordRequest: ['payload'],
  forgotPasswordSuccess: null,
  forgotPasswordFailure: null,

  resetPasswordRequest: ['params', 'payload'],
  resetPasswordSuccess: null,
  resetPasswordFailure: null,

  setInfoDialogContent: ['payload'],

  getUserPermissionsRequest: ['params'],
  getUserPermissionsSuccess: ['payload'],
  getUserPermissionsFailure: null,

  getUserGroupRequest: ['params'],
  getUserGroupSuccess: ['payload'],
  getUserGroupFailure: null,
});

export default Creators;
