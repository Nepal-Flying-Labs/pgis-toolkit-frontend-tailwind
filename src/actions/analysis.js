import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    checkProcessingStatusRequest: ['payload'],
    setAnalysisState: ['payload'],

    getProjectThemesRequest: ['params'],
    getProjectThemesSuccess: ['payload'],
    getProjectThemesFailure: null,

    getProjectThemeLayersRequest: ['params'],
    getProjectThemeLayersSuccess: ['payload'],
    getProjectThemeLayersFailure: null,

    handleLayerCheckbox: ['payload'],
    setZoomToLayerId: ['payload'],

    copyLayerDataRequest: ['payload'],
    copyLayerDataSuccess: ['payload'],
    copyLayerDataFailure: null,

    getProjectGeojsonRequest: ['params'],
    getProjectGeojsonSuccess: ['payload'],
    getProjectGeojsonFailure: null,

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
    handleTableCheckbox: ['payload'],

    setSelectedInfo: ['payload'],
    toggleSidebar: ['payload'],
  },
  { prefix: 'analysis/' },
);

export default Creators;
