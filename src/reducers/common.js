import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  showModal: false,
  modalContent: '',
  showPromptDialog: false,
  promptDialogContent: '',
  projectHeaderHeight: 65,
};

const toggleModal = (state, action) => ({
  ...state,
  showModal: !state.showModal,
  modalContent: action.payload || state.modalContent,
});

const setModalContent = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const togglePromptDialog = (state, action) => ({
  ...state,
  showPromptDialog: !state.showPromptDialog,
  promptDialogContent: action.payload || state.promptDialogContent,
});

const setPromptDialogContent = (state, action) => ({
  ...state,
  promptDialogContent: action.payload || '',
});

const setProjectHeaderHeight = (state, action) => ({
  ...state,
  projectHeaderHeight: action.payload,
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.SET_MODAL_CONTENT]: setModalContent,
  [Types.TOGGLE_PROMPT_DIALOG]: togglePromptDialog,
  [Types.SET_PROMPT_DIALOG_CONTENT]: setPromptDialogContent,
  [Types.SET_PROJECT_HEADER_HEIGHT]: setProjectHeaderHeight,
});

export default commonReducer;
