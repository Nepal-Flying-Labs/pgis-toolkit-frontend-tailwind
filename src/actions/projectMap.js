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
  },
  { prefix: 'projectMap/' },
);

export default Creators;
