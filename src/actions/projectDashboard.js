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

    downloadProjectLayerRequest: ['params'],
    downloadProjectLayerSuccess: ['payload'],
    downloadProjectLayerFailure: null,

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

    // project-document
    downloadDocumentRequest: ['params'],
    downloadDocumentSuccess: ['payload'],
    downloadDocumentFailure: ['payload'],

    uploadDocumentDataRequest: ['id', 'payload'],
    uploadDocumentDataSuccess: ['payload'],
    uploadDocumentDataFailure: ['payload'],

    updateDocumentDataRequest: ['id', 'payload'],
    updateDocumentDataSuccess: ['payload'],
    updateDocumentDataFailure: ['payload'],

    deleteDocumentRequest: ['id', 'payload'],
    deleteDocumentSuccess: ['payload'],
    deleteDocumentFailure: null,

    getProjectCountryRequest: ['params'],
    getProjectCountrySuccess: ['payload'],
    getProjectCountryFailure: ['payload'],

    getProjectStateRequest: ['params'],
    getProjectStateSuccess: ['payload'],
    getProjectStateFailure: ['payload'],

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

    setIndividualAttribute: ['payload'],
    clearIndividualAttribute: null,

    setAttributeList: ['payload'],

    clearAttributeListData: null,

    getLayerAttributeRequest: ['params'],
    getLayerAttributeSuccess: ['payload'],
    getLayerAttributeFailure: null,

    postAttributeSelectionRequest: ['payload'],
    postAttributeSelectionSuccess: ['payload'],
    postAttributeSelectionFailure: null,

    postTemplateAttributeRequest: ['payload'],
    postTemplateAttributeSuccess: ['payload'],
    postTemplateAttributeFailure: null,

    updateTemplateAttributeRequest: ['id', 'payload'],
    updateTemplateAttributeSuccess: ['payload'],
    updateTemplateAttributeFailure: null,

    deleteTemplateAttributeRequest: ['id', 'payload'],
    deleteTemplateAttributeSuccess: ['payload'],
    deleteTemplateAttributeFailure: null,

    downloadBulkTemplateRequest: ['params'],
    downloadBulkTemplateSuccess: ['payload'],
    downloadBulkTemplateFailure: null,

    getUsersRequest: ['params'],
    getUsersSuccess: ['payload'],
    getUsersFailure: null,

    setUserState: ['payload'],

    getUserGroupRequest: ['params'],
    getUserGroupSuccess: ['payload'],
    getUserGroupFailure: null,

    setDocumentState: ['payload'],

    uploadGalleryRequest: ['id', 'payload'],
    uploadGallerySuccess: ['payload'],
    uploadGalleryFailure: ['payload'],

    downloadGalleryRequest: ['params'],
    downloadGallerySuccess: ['payload'],
    downloadGalleryFailure: ['payload'],

    // project-individual-gallery
    getGalleryByIdRequest: ['id'],
    getGalleryByIdSuccess: ['payload'],
    getGalleryByIdFailure: ['payload'],

    setGalleryState: ['payload'],

    deleteGalleryRequest: ['id', 'payload'],
    deleteGallerySuccess: ['payload'],
    deleteGalleryFailure: null,

    updateGalleryRequest: ['id', 'payload'],
    updateGallerySuccess: ['payload'],
    updateGalleryFailure: ['payload'],

    updateUserStatusRequest: ['id', 'payload'],
    updateUserStatusSuccess: ['payload'],
    updateUserStatusFailure: null,

    deleteUserRequest: ['id', 'payload'],
    deleteUserSuccess: ['payload'],
    deleteUserFailure: null,

    updateInvitedUserStatusRequest: ['id', 'payload'],
    updateInvitedUserStatusSuccess: ['payload'],
    updateInvitedUserStatusFailure: null,

    resendInvitationRequest: ['id', 'payload'],
    resendInvitationSuccess: ['payload'],
    resendInvitationFailure: null,

    deleteInvitedUserRequest: ['id', 'payload'],
    deleteInvitedUserSuccess: ['payload'],
    deleteInvitedUserFailure: null,

    postDatasetThemeRequest: ['payload'],
    postDatasetThemeSuccess: ['payload'],
    postDatasetThemeFailure: null,

    updateDataLayerRequest: ['id', 'payload'],
    updateDataLayerSuccess: ['payload'],
    updateDataLayerFailure: null,

    updateTemplateDropdownRequest: ['id', 'payload'],
    updateTemplateDropdownSuccess: ['payload'],
    updateTemplateDropdownFailure: null,

    getTemplateDropdownChoiceRequest: ['params'],
    getTemplateDropdownChoiceSuccess: ['payload'],
    getTemplateDropdownChoiceFailure: null,
  },
  { prefix: 'projectDashboard/' },
);

export default Creators;
