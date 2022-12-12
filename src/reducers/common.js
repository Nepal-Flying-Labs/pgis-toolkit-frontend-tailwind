import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  modalContent: '',
  promptDialogContent: '',
  projectHeaderHeight: 65,
};

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const togglePromptDialog = (state, action) => ({
  ...state,
  promptDialogContent: action.payload || '',
});

const setProjectHeaderHeight = (state, action) => ({
  ...state,
  projectHeaderHeight: action.payload,
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.TOGGLE_PROMPT_DIALOG]: togglePromptDialog,
  [Types.SET_PROJECT_HEADER_HEIGHT]: setProjectHeaderHeight,
});

export default commonReducer;
