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
  },
  { prefix: 'analysis/' },
);

export default Creators;
