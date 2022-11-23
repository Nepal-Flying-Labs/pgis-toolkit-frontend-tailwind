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
});

export default Creators;
