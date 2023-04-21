import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  showModal: false,
  modalContent: '',
  showModalTwo: false,
  modalTwoContent: '',
  showPromptDialog: false,
  promptDialogContent: '',
  projectHeaderHeight: 65,
  rightSidebar: {
    show: false,
    flag: '',
  },
  showImageModal: false,
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

const toggleModalTwo = (state, action) => ({
  ...state,
  showModalTwo: !!action.payload || !state.showModalTwo,
  modalTwoContent: action.payload || state.modalTwoContent,
});

const setModalTwoContent = (state, action) => ({
  ...state,
  modalTwoContent: action.payload || '',
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

const setImageModal = (state, action) => ({
  ...state,
  showImageModal: action.payload,
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.SET_MODAL_CONTENT]: setModalContent,
  [Types.TOGGLE_MODAL_TWO]: toggleModalTwo,
  [Types.SET_MODAL_TWO_CONTENT]: setModalTwoContent,
  [Types.TOGGLE_PROMPT_DIALOG]: togglePromptDialog,
  [Types.SET_PROMPT_DIALOG_CONTENT]: setPromptDialogContent,
  [Types.SET_PROJECT_HEADER_HEIGHT]: setProjectHeaderHeight,
  [Types.SET_RIGHT_SIDEBAR_STATE]: setRightSidebarState,
  [Types.SET_IMAGE_MODAL]: setImageModal,
});

export default commonReducer;
