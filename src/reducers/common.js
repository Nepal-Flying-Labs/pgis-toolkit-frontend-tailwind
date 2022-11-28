import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/common';

const initialState = {
  modalContent: '',
};

const toggleModal = (state, action) => ({
  ...state,
  modalContent: action.payload || '',
});

const commonReducer = createReducer(initialState, {
  [Types.TOGGLE_MODAL]: toggleModal,
});

export default commonReducer;
