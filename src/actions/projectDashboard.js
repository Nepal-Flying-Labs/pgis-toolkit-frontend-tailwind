import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectDetailRequest: ['params'],
    getProjectDetailSuccess: ['payload'],
    getProjectDetailFailure: null,

    getProjectLayersRequest: ['params'],
    getProjectLayersSuccess: ['payload'],
    getProjectLayersFailure: null,

    getCategoryListRequest: ['params'],
    getCategoryListSuccess: ['payload'],
    getCategoryListFailure: null,

    uploadDatasetsRequest: ['payload'],
    uploadDatasetsSuccess: ['payload'],
    uploadDatasetsFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
