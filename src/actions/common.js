import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    toggleModal: ['payload'],
    setModalContent: ['payload'],
    togglePromptDialog: ['payload'],
    setProjectHeaderHeight: ['payload'],
  },
  { prefix: 'common/' },
);

export default Creators;
