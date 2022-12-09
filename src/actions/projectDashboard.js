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

    deleteDataRequest: ['id', 'payload'],
    deleteDataSuccess: ['payload'],
    deleteDataFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
