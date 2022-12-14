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

    setUploadStatusCheckingId: ['payload'],

    checkUploadStatusRequest: ['id'],
    checkUploadStatusSuccess: ['payload'],
    checkUploadStatusFailure: null,

    getErrorDetailRequest: ['params'],
    getErrorDetailSuccess: ['payload'],
    getErrorDetailFailure: null,

    setDataState: ['payload'],

    permanentDataDeleteRequest: ['id'],
    permanentDataDeleteSuccess: ['payload'],
    permanentDataDeleteFailure: null,

    handleAddToMap: ['payload'],

    updateDataRequest: ['id', 'payload'],
    updateDataSuccess: ['payload'],
    updateDataFailure: ['payload'],
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
