import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  modalContent: '',
  promptDialogContent: '',
};

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const togglePromptDialog = (state, action) => ({
  ...state,
  promptDialogContent: action.payload || '',
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.TOGGLE_PROMPT_DIALOG]: togglePromptDialog,
});

export default commonReducer;
