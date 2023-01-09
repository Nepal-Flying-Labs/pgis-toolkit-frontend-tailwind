import { createReducer } from 'reduxsauce';
import { Types } from '@Actions/dataCleaning';
import { checkErrorData } from '@src/constants/analysis';

const initialState = {
  stepIndex: 1,
  manualFix: {
    sidebarContent: 'error-list', // 'error-list', 'add-feature', 'edit-feature'
    drawFeatureId: null,
    drawnFeatureWkt: null,
    layerAttributes: null,
    individualAttributeData: [],
    refreshLayerId: null,
    selectedError: null,
  },
  // selectedLayer: null, // selected layer for manual fix
  selectedLayer: {
    id: 507,
    name: 'Null_geom_Large_Area',
    layer_type: 'Vector',
    upload_status: 'successful',
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#2C675A',
      lineOpacity: 40,
      fillColor: '#f97d4a',
      fillOpacity: 0,
      lineThickness: 1,
      circleRadius: 5,
      dashline: 0,
      showLabel: false,
      labelField: '',
      labelFont: 'Calibri',
      labelFontSize: 14,
      labelColor: '#000000',
      labelOpacity: 100,
      labelOutlineWidth: 3,
      labelOutlineColor: '#ffffff',
      labelOffsetX: 0,
      labelOffsetY: 0,
      labelText: 'normal',
      labelMaxResolution: 1200,
      labelAlign: 'center',
      labelBaseline: 'middle',
      labelRotationDegree: 0,
      labelFontWeight: 'normal',
      labelPlacement: 'point',
      labelMaxAngleDegree: 0.7853981633974483,
      labelOverflow: false,
      labelLineHeight: 1,
      icon: {},
      showSublayer: false,
      sublayerColumnName: '',
      sublayer: {},
      geometryType: 'MultiLineString',
    },
    bbox: [
      85.39604534275621, 27.686313633829993, 85.41973471439125,
      27.71203178188435,
    ],
    geom_type: 'MultiLineString',
    sub_layer: [],
    theme: 479,
    checked: true,
  },
  errorFeaturesData: null,
  optimalRoute: {
    selectedRoadLayer: {
      // id: 506,
      // name: 'Road_Test_Small_Section1',
      // layer_type: 'Vector',
      // upload_status: 'successful',
      // bbox: [
      //   -0.144022770398482, -0.093301707779886, 0.098102466793169,
      //   0.094554079696395,
      // ],
      // geom_type: 'MultiLineString',
      // sub_layer: [],
    },
    selectedObstacleLayers: [], // []
  },
  errorStates: {},
};

const setAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setOptimalRouteState = (state, action) => ({
  ...state,
  optimalRoute: {
    ...state.optimalRoute,
    ...action.payload,
  },
});

const setErrorStates = (state, action) => {
  const id = action.payload;
  return {
    ...state,
    errorStates: {
      ...state.errorStates,
      [id]: checkErrorData.map(item => ({
        ...item,
        status: 'waiting',
        errorData: null,
        totalData: null,
        checked: false,
      })),
    },
  };
};

const setErrorCheckingStatus = (state, action) => {
  const { layerId, id, status } = action.payload;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.id === id
        ? {
            ...item,
            status,
          }
        : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const checkErrorSuccess = (state, action) => {
  const data = action.payload;
  const { layerId } = data;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.id === data.id
        ? {
            ...item,
            errorData: data.error_data,
            totalData: data.total_data,
            status: !data.error_data ? 'success' : 'error',
          }
        : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const handleAutofixCheckbox = (state, action) => {
  const { id, checked, layerId } = action.payload;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.id === id ? { ...item, checked } : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const autoFixErrorSuccess = (state, action) => {
  const data = action.payload;
  const { layerId } = data;
  const error = data.prev_error - data.new_error;
  const errorStates = {
    ...state.errorStates,
    [layerId]: state.errorStates[layerId].map(item =>
      item.id === data.id
        ? {
            ...item,
            errorData: error,
            totalData: data.prev_error,
            status: !data.new_error ? 'success' : 'fix-failed',
            checked: false,
          }
        : { ...item },
    ),
  };
  return {
    ...state,
    errorStates,
  };
};

const getErrorFeaturesSuccess = (state, action) => {
  const data = Object.entries(action.payload).reduce(
    (obj, [key, value]) =>
      value.length
        ? {
            ...obj,
            [key]: Array.isArray(value)
              ? value.map(val => ({ id: val, checked: false }))
              : value,
          }
        : { ...obj },
    {},
  );
  return {
    ...state,
    errorFeaturesData: data,
  };
};

const setManualFixState = (state, action) => ({
  ...state,
  manualFix: {
    ...state.manualFix,
    ...action.payload,
  },
});

const getLayerAttributeFieldsSuccess = (state, action) => {
  const { layerAttributes } = state.manualFix;
  const individualAttributeData = action.payload.map(item => ({
    ...item,
    value: layerAttributes?.[`${item.name}`] || '',
  }));
  return {
    ...state,
    manualFix: {
      ...state.manualFix,
      individualAttributeData,
    },
  };
};

const updateFeatureCollectionSuccess = (state, action) => {
  const refreshLayerId = action.payload.layer;
  const {
    sidebarContent,
    drawFeatureId,
    drawnFeatureWkt,
    layerAttributes,
    individualAttributeData,
  } = initialState.manualFix;
  return {
    ...state,
    manualFix: {
      ...state.manualFix,
      refreshLayerId,
      sidebarContent,
      drawFeatureId,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
    },
  };
};

const handleErrorCheckbox = (state, action) => {
  const { id, name, checked } = action.payload;
  const errorFeaturesData = {
    ...state.errorFeaturesData,
    [name]: state.errorFeaturesData[name].map(item =>
      item.id === +id ? { ...item, checked } : { ...item },
    ),
  };
  return {
    ...state,
    errorFeaturesData,
  };
};

const deleteFeatureSuccess = state => {
  const { id, type } = state.manualFix.selectedError;
  const errorFeaturesData = {
    ...state.errorFeaturesData,
    [type]: state.errorFeaturesData[type].filter(item => item.id !== id),
  };
  return {
    ...state,
    errorFeaturesData,
  };
};

const dataCleaningReducer = createReducer(initialState, {
  [Types.SET_ANALYSIS_STATE]: setAnalysisState,
  [Types.SET_OPTIMAL_ROUTE_STATE]: setOptimalRouteState,
  [Types.SET_ERROR_STATES]: setErrorStates,
  [Types.CHECK_ERROR_SUCCESS]: checkErrorSuccess,
  [Types.SET_ERROR_CHECKING_STATUS]: setErrorCheckingStatus,
  [Types.HANDLE_AUTOFIX_CHECKBOX]: handleAutofixCheckbox,
  [Types.AUTO_FIX_ERROR_SUCCESS]: autoFixErrorSuccess,
  [Types.GET_ERROR_FEATURES_SUCCESS]: getErrorFeaturesSuccess,
  [Types.SET_MANUAL_FIX_STATE]: setManualFixState,
  [Types.GET_LAYER_ATTRIBUTE_FIELDS_SUCCESS]: getLayerAttributeFieldsSuccess,
  [Types.UPDATE_FEATURE_COLLECTION_SUCCESS]: updateFeatureCollectionSuccess,
  [Types.HANDLE_ERROR_CHECKBOX]: handleErrorCheckbox,
  [Types.DELETE_FEATURE_SUCCESS]: deleteFeatureSuccess,
});

export default dataCleaningReducer;
