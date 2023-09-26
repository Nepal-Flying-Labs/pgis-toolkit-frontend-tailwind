import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    postRequestForDemoRequest: ['params'],
    postRequestForDemoSuccess: ['payload'],
    postRequestForDemoFailure: null,

    setAddRequestData: ['payload'],
    clearData: ['payload'],

    getFileForDownloadRequest: ['params'],
  },
  { prefix: 'Landing/' },
);

export default Creators;
