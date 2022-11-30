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
    handleStyleInput: ['payload'],
  },
  { prefix: 'projectMap/' },
);

export default Creators;
