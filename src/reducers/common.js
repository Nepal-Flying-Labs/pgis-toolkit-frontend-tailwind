import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  showModal: false,
  modalContent: '',
  promptDialogContent: '',
  showPromptDialog: '',
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
  [Types.SET_PROJECT_HEADER_HEIGHT]: setProjectHeaderHeight,
});

export default commonReducer;
