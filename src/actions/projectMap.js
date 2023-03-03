import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getProjectThemesRequest: ['params'],
    getProjectThemesSuccess: ['payload'],
    getProjectThemesFailure: null,

    getProjectThemeLayersRequest: ['params'],
    getProjectThemeLayersSuccess: ['payload'],
    getProjectThemeLayersFailure: null,

    handleCheckbox: ['payload'],
    setZoomToLayerId: ['payload'],
    setSelectedProjectTheme: ['payload'],

    uploadLayerRequest: ['payload'],
    uploadLayerSuccess: ['payload'],
    uploadLayerFailure: null,

    getMapPopupDataRequest: ['params'],
    getMapPopupDataSuccess: ['payload'],
    getMapPopupDataFailure: null,

    setSelectedLayer: ['payload'],
    setDeleteLayer: ['payload'],
    setSidebarContent: ['payload'],
    handleStyleInput: ['payload'],
    handleIconInput: ['payload'],

    updateLayerRequest: ['id', 'payload'],
    updateLayerSuccess: ['payload'],
    updateLayerFailure: null,

    deleteLayerRequest: ['id', 'payload'],
    deleteLayerSuccess: ['payload'],
    deleteLayerFailure: null,

    uploadIconRequest: ['id', 'payload'],
    uploadIconSuccess: ['payload'],
    uploadIconFailure: null,

    deleteIconRequest: ['id', 'payload'],
    deleteIconSuccess: ['payload'],
    deleteIconFailure: null,

    toggleSidebar: null,
    setSearchText: ['payload'],

    saveMapConfigRequest: ['params', 'payload'],
    saveMapConfigSuccess: ['payload'],
    saveMapConfigFailure: null,

    setMapConfig: ['payload'],
    setProjectMapState: ['payload'],

    getLayerAttributeFieldsRequest: ['params'],
    getLayerAttributeFieldsSuccess: ['payload'],
    getLayerAttributeFieldsFailure: null,

    postNewLayerFeatureRequest: ['payload'],
    postNewLayerFeatureSuccess: ['payload'],
    postNewLayerFeatureFailure: null,

    getFeatureCollectionRequest: ['id'],
    getFeatureCollectionSuccess: ['payload'],
    getFeatureCollectionFailure: null,

    updateFeatureCollectionRequest: ['id', 'payload'],
    updateFeatureCollectionSuccess: ['payload'],
    updateFeatureCollectionFailure: null,

    getProjectGeojsonRequest: ['params'],
    getProjectGeojsonSuccess: ['payload'],
    getProjectGeojsonFailure: null,

    resetProjectMapState: null,

    getDataQueryFieldsRequest: ['params'],
    getDataQueryFieldsSuccess: ['payload'],
    getDataQueryFieldsFailure: null,

    getDataQueryValuesRequest: ['params'],
    getDataQueryValuesSuccess: ['payload'],
    getDataQueryValuesFailure: null,

    postAdvanceQueryRequest: ['payload', 'data'],
    postAdvanceQuerySuccess: ['payload'],
    postAdvanceQueryFailure: null,

    handleDataQueryCheckbox: ['payload'],
    setDataQueryState: ['payload'],

    saveDataQueryRequest: ['payload'],
    saveDataQuerySuccess: ['payload'],
    saveDataQueryFailure: null,

    deleteDataQuery: ['payload'],
    deleteAllDataQuery: null,

    getLayerAttributeRequest: ['params'],
    getLayerAttributeSuccess: ['payload'],
    getLayerAttributeFailure: null,

    setAttributeTableSearchTerm: ['payload'],

    handleAttributeNextClick: null,
    handleAttributePreviousClick: null,
    handleAttributeJumpsTo: ['payload'],
    handleAttributeRowSelect: ['payload'],
    handleAttributeOrdering: ['payload'],

    resetLayerAttributeListState: null,

    getQueryAttributeRequest: ['params'],
    getQueryAttributeSuccess: ['payload'],
    getQueryAttributeFailure: null,

    setSelectedLayerAttribute: ['payload'],

    getLayerAttributeListRequest: ['params'],
    getLayerAttributeListSuccess: ['payload'],
    getLayerAttributeListFailure: null,

    updateLayerAttributeRequest: ['id', 'payload'],
    updateLayerAttributeSuccess: ['payload'],
    updateLayerAttributeFailure: null,

    updateLayerAttributeFieldsRequest: ['id', 'payload'],
    updateLayerAttributeFieldsSuccess: ['payload'],
    updateLayerAttributeFieldsFailure: null,

    updateDropdownFieldRequest: ['id', 'payload'],
    updateDropdownFieldSuccess: ['payload'],
    updateDropdownFieldFailure: null,

    getFieldsDropdownOptionRequest: ['params'],
    getFieldsDropdownOptionSuccess: ['payload'],
    getFieldsDropdownOptionFailure: null,

    postLayerAttributeFieldsRequest: ['payload'],
    postLayerAttributeFieldsSuccess: ['payload'],
    postLayerAttributeFieldsFailure: null,

    deleteLayerAttributeRequest: ['id'],
    deleteLayerAttributeSuccess: ['payload'],
    deleteLayerAttributeFailure: null,

    postCreateImageToUrlRequest: ['payload'],
    postCreateImageToUrlSuccess: ['payload'],
    postCreateImageToUrlFailure: null,

    getAttributeFieldRequest: ['params'],
    getAttributeFieldSuccess: ['payload'],
    getAttributeFieldFailure: null,

    getFeatureImageRequest: ['id'],
    getFeatureImageSuccess: ['payload'],
    getFeatureImageFailure: null,
  },
  { prefix: 'projectMap/' },
);

export default Creators;
