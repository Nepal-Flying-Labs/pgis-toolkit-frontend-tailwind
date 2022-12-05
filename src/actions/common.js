import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    toggleModal: ['payload'],
    togglePromptDialog: ['payload'],
  },
  { prefix: 'common/' },
);

export default Creators;
