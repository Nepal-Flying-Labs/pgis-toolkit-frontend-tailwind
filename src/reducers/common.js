import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  showModal: false,
  modalContent: '',
  showPromptDialog: false,
  promptDialogContent: '',
  projectHeaderHeight: 65,
  rightSidebar: {
    show: false,
    flag: '',
  },
};

const toggleModal = (state, action) => ({
  ...state,
  showModal: !!action.payload || !state.showModal,
  modalContent: action.payload || state.modalContent,
});

const setModalContent = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const togglePromptDialog = (state, action) => ({
  ...state,
  showPromptDialog: !!action.payload || !state.showPromptDialog,
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

const setRightSidebarState = (state, action) => ({
  ...state,
  rightSidebar: { ...state.rightSidebar, ...action.payload },
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.SET_MODAL_CONTENT]: setModalContent,
  [Types.TOGGLE_PROMPT_DIALOG]: togglePromptDialog,
  [Types.SET_PROMPT_DIALOG_CONTENT]: setPromptDialogContent,
  [Types.SET_PROJECT_HEADER_HEIGHT]: setProjectHeaderHeight,
  [Types.SET_RIGHT_SIDEBAR_STATE]: setRightSidebarState,
});

export default commonReducer;
