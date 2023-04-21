import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    toggleModal: ['payload'],
    setModalContent: ['payload'],

    toggleModalTwo: ['payload'],
    setModalTwoContent: ['payload'],

    togglePromptDialog: ['payload'],
    setPromptDialogContent: ['payload'],

    setProjectHeaderHeight: ['payload'],
    setRightSidebarState: ['payload'],

    setImageModal: ['payload'],
  },
  { prefix: 'common/' },
);

export default Creators;
