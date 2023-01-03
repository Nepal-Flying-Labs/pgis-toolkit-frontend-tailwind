import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    toggleModal: ['payload'],
    setModalContent: ['payload'],
    togglePromptDialog: ['payload'],
    setPromptDialogContent: ['payload'],
    setProjectHeaderHeight: ['payload'],
    setRightSidebarState: ['payload'],
  },
  { prefix: 'common/' },
);

export default Creators;
