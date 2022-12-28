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

    resetProjectDashboardState: null,

    setSearchText: ['payload'],

    // project-info
    getProjectInfoRequest: ['id'],
    getProjectInfoSuccess: ['payload'],
    getProjectInfoFailure: ['payload'],

    // project-contact-person
    getContactPersonInfoRequest: ['params'],
    getContactPersonInfoSuccess: ['payload'],
    getContactPersonInfoFailure: ['payload'],

    // project-gallery
    getGalleryItemRequest: ['params'],
    getGalleryItemSuccess: ['payload'],
    getGalleryItemFailure: ['payload'],

    // project-document
    getDocumentItemRequest: ['params'],
    getDocumentItemSuccess: ['payload'],
    getDocumentItemFailure: ['payload'],

    // project-individual-document
    getDocumentByIdRequest: ['id'],
    getDocumentByIdSuccess: ['payload'],
    getDocumentByIdFailure: ['payload'],

    // project-individual-document
    downloadDocumentRequest: ['params'],
    downloadDocumentSuccess: ['payload'],
    downloadDocumentFailure: ['payload'],

    uploadDocumentDataRequest: ['id', 'payload'],
    uploadDocumentDataSuccess: ['payload'],
    uploadDocumentDataFailure: ['payload'],

    getLayerTemplateRequest: ['id'],
    getLayerTemplateSuccess: ['payload'],
    getLayerTemplateFailure: null,

    patchLayerTemplateRequest: ['id', 'payload'],
    patchLayerTemplateSuccess: ['payload'],
    patchLayerTemplateFailure: null,

    postImportTemplateRequest: ['payload'],
    postImportTemplateSuccess: ['payload'],
    postImportTemplateFailure: null,

    setSelectedLayer: ['payload'],

    clearAttributeListData: null,

    getLayerAttributeRequest: ['params'],
    getLayerAttributeSuccess: ['payload'],
    getLayerAttributeFailure: null,

    postAttributeSelectionRequest: ['payload'],
    postAttributeSelectionSuccess: ['payload'],
    postAttributeSelectionFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
