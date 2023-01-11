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
    selectedFeaturesForSnap: [],
    geojsonFeatures: null,
  },
  selectedLayer: null, // selected layer for manual fix
  errorFeaturesData: null,
  optimalRoute: {
    selectedRoadLayer: {},
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
  let errorFeaturesData = {};
  if (state.manualFix.selectedError.type === 'null') {
    errorFeaturesData = {
      ...state.errorFeaturesData,
      null: state.errorFeaturesData.null.filter(
        item => item.id !== state.manualFix.selectedError.id,
      ),
    };
  } else {
    errorFeaturesData = state.errorFeaturesData;
  }
  const {
    sidebarContent,
    drawFeatureId,
    drawnFeatureWkt,
    layerAttributes,
    individualAttributeData,
    selectedError,
    selectedFeaturesForSnap,
    geojsonFeatures,
  } = initialState.manualFix;
  return {
    ...state,
    errorFeaturesData,
    manualFix: {
      ...state.manualFix,
      refreshLayerId,
      sidebarContent,
      drawFeatureId,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
      selectedError,
      selectedFeaturesForSnap,
      geojsonFeatures,
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

const deleteSelectedFeaturesSuccess = (state, action) => {
  const deletedLayers = action.payload;
  const errorFeaturesData = {
    ...state.errorFeaturesData,
    null: state.errorFeaturesData.null.filter(
      item => !deletedLayers.includes(item.id),
    ),
  };
  return {
    ...state,
    errorFeaturesData,
  };
};

const getFeatureGeojsonSuccess = (state, action) => {
  const geojsonFeatures = action.payload;
  return {
    ...state,
    manualFix: {
      ...state.manualFix,
      geojsonFeatures,
    },
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
  [Types.DELETE_SELECTED_FEATURES_SUCCESS]: deleteSelectedFeaturesSuccess,
  [Types.GET_FEATURE_GEOJSON_SUCCESS]: getFeatureGeojsonSuccess,
});

export default dataCleaningReducer;
