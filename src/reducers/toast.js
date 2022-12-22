import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/toast';

const successToast = (_, action) => ({
  type: 'success',
  message: action.payload.message,
  ...action.payload,
});

const errorToast = (_, action) => ({
  type: 'danger',
  message: action.payload.message,
  ...action.payload,
});

const clearToast = () => ({});

const toastReducer = createReducer(
  {},
  {
    [Types.SUCCESS]: successToast,
    [Types.ERROR]: errorToast,
    [Types.CLEAR]: clearToast,
  },
);

export default toastReducer;
