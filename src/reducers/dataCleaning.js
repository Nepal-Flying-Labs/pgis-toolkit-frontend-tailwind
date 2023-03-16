/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { parse } from 'wkt';
import bbox from '@turf/bbox';
import { Types } from '@Actions/dataCleaning';
import { checkErrorData, pointCheckExceptions } from '@src/constants/analysis';
import { pointTypes } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

const initialState = {
  stepIndex: 1,
  manualFix: {
    sidebarContent: 'error-list', // 'error-list', 'add-feature', 'edit-feature'
    drawnFeatureWkt: null, //  '' | [], array for split
    layerAttributes: null,
    layerAttributesFields: null,
    individualAttributeData: [],
    refreshLayerId: null,
    selectedError: null,
    selectedFeaturesForSnap: [],
    geojsonFeatures: null,
    selectedFeatureAttributes: null,
    explodingFeatureIds: [], // for showing loader while exploding features
    startEditing: false, // toggle DrawTool only when startEditing true
    featureBbox: null, // bbox for zoom to layer
  },
  selectedLayer: null, // selected layer for manual fix
  errorFeaturesData: null,
  optimalRoute: {
    selectedRoadLayer: {},
    selectedObstacleLayers: [], // []
  },
  errorStates: {},
};

const setDataCleaningState = (state, action) => ({
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
  const { layerId, geometryType } = action.payload;
  const errorStateData = checkErrorData.map(item => ({
    ...item,
    status: 'waiting',
    errorData: null,
    totalData: null,
    checked: false,
  }));
  return {
    ...state,
    errorStates: {
      ...state.errorStates,
      [layerId]: pointTypes.includes(geometryType)
        ? errorStateData.filter(item => !pointCheckExceptions.includes(item.id))
        : errorStateData,
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
  const layerAttributesFields = action.payload;
  return {
    ...state,
    manualFix: {
      ...state.manualFix,
      individualAttributeData,
      layerAttributesFields,
    },
  };
};

const updateFeatureCollectionSuccess = (state, action) =>
  produce(state, draft => {
    const refreshLayerId = action.payload.layer;
    const { id, attributes, geometry } = action.payload;
    const { type, parentId } = draft.manualFix.selectedError;
    if (parentId) {
      const parentFeature = draft.errorFeaturesData[type].find(
        item => item.id === parentId,
      );
      const changedFeature = parentFeature.children.find(
        item => item.id === id,
      );
      changedFeature.fixed = true;
      changedFeature.attributes = attributes;
      changedFeature.geojson = parse(geometry);
    } else {
      const changedFeature = draft.errorFeaturesData[type].find(
        item => item.id === id,
      );
      changedFeature.fixed = true;
      changedFeature.attributes = attributes;
      changedFeature.geojson = parse(geometry);
    }
    const {
      sidebarContent,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
      selectedError,
      selectedFeaturesForSnap,
      geojsonFeatures,
      startEditing,
    } = initialState.manualFix;
    draft.manualFix = {
      ...draft.manualFix,
      refreshLayerId,
      sidebarContent,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
      selectedError,
      selectedFeaturesForSnap,
      geojsonFeatures,
      startEditing,
    };
  });

const handleErrorCheckbox = (state, action) =>
  produce(state, draft => {
    const { id, parentId, name, checked } = action.payload;
    if (parentId) {
      const parentData = draft.errorFeaturesData[name].find(
        item => item.id === parentId,
      );
      const featureData = parentData.children.find(item => item.id === id);
      featureData.checked = checked;
    } else {
      const featureData = draft.errorFeaturesData[name].find(
        item => item.id === id,
      );
      featureData.checked = checked;
    }
  });

const deleteFeatureSuccess = state => {
  const { id } = state.manualFix.selectedError;
  const errorFeaturesData = Object.entries(state.errorFeaturesData).reduce(
    (obj, [key, val]) => ({
      ...obj,
      [key]: val.filter(item => item.id !== id),
    }),
    {},
  );
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

const getFeaturesGeojsonSuccess = (state, action) => {
  const geojsonFeatures = action.payload;
  const { selectedFeaturesForSnap } = initialState.manualFix;
  return {
    ...state,
    manualFix: {
      ...state.manualFix,
      geojsonFeatures,
      startEditing: true,
      selectedFeaturesForSnap,
    },
  };
};

const resetDataCleaningState = () => ({ ...initialState });

const saveAttributeEdit = (state, action) =>
  produce(state, draft => {
    const data = action.payload;
    if (state.manualFix.selectedError.type === 'multipart') {
      const selectedFeatureAttribute = draft.errorFeaturesData.multipart.find(
        item => item.id === +draft.manualFix.selectedError.id.split('-')[0],
      );
      const selectedExplodedFeature = selectedFeatureAttribute.children.find(
        item => item.id === draft.manualFix.selectedError.id,
      );
      selectedExplodedFeature.attributes = data;
    }
    const { sidebarContent, individualAttributeData, selectedError } =
      initialState.manualFix;
    draft.manualFix = {
      ...draft.manualFix,
      sidebarContent,
      individualAttributeData,
      selectedError,
    };
  });

const explodeFeatureRequest = (state, action) =>
  produce(state, draft => {
    draft.manualFix.explodingFeatureIds.push(action.payload);
  });

const explodeFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const { layerData, explodeData } = action.payload;
    const { id: featureId } = layerData;
    const explodedFeature = draft.errorFeaturesData.multipart.find(
      item => item.id === featureId,
    );
    explodedFeature.children = explodeData.map(item => ({
      parentId: featureId,
      id: item.id,
      attributes: item.attributes,
      geojson: parse(item.geometry),
    }));
    explodedFeature.fixed = true;
    draft.manualFix.explodingFeatureIds =
      draft.manualFix.explodingFeatureIds.filter(item => item !== featureId);
  });

const explodeFeatureFailure = (state, action) =>
  produce(state, draft => {
    draft.manualFix.explodingFeatureIds =
      draft.manualFix.explodingFeatureIds.filter(
        item => item !== action.payload,
      );
  });

const getSelectedFeatureAttributesSuccess = (state, action) =>
  produce(state, draft => {
    const { attributes, geometry } = action.payload;
    const geojson = parse(geometry);
    const { selectedError } = draft.manualFix;
    selectedError.attributes = attributes;
    selectedError.geojson = geojson;
  });

const resetManualFixState = state =>
  produce(state, draft => {
    draft.manualFix = initialState.manualFix;
    draft.selectedLayer = initialState.selectedLayer;
    draft.errorFeaturesData = initialState.errorFeaturesData;
  });

const getFeatureGeojsonSuccess = (state, action) =>
  produce(state, draft => {
    const { geojson, featureId, parentId, type } = action.payload;
    const featureBbox = bbox(geojson);
    draft.featureBbox = featureBbox;
    if (parentId) {
      const parentData = draft.errorFeaturesData[type].find(
        item => item.id === parentId,
      );
      const featureData = parentData.children.find(
        item => item.id === featureId,
      );
      featureData.checked = true;
    } else {
      const featureData = draft.errorFeaturesData[type].find(
        item => item.id === featureId,
      );
      featureData.checked = true;
    }
  });

const splitFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const splittedData = action.payload;
    const refreshLayerId = splittedData.layer;
    const { id: featureId, type: errorType } = draft.manualFix.selectedError;
    const splittedFeature = draft.errorFeaturesData[errorType].find(
      item => item.id === featureId,
    );
    splittedFeature.children = splittedData.map(item => ({
      parentId: featureId,
      id: item.id,
      attributes: item.attributes,
      geojson: parse(item.geometry),
    }));
    splittedFeature.fixed = true;
    const {
      sidebarContent,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
      selectedError,
      selectedFeaturesForSnap,
      geojsonFeatures,
      startEditing,
    } = initialState.manualFix;
    draft.manualFix = {
      ...draft.manualFix,
      refreshLayerId,
      sidebarContent,
      drawnFeatureWkt,
      layerAttributes,
      individualAttributeData,
      selectedError,
      selectedFeaturesForSnap,
      geojsonFeatures,
      startEditing,
    };
  });

const dataCleaningReducer = createReducer(initialState, {
  [Types.SET_DATA_CLEANING_STATE]: setDataCleaningState,
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
  [Types.GET_FEATURES_GEOJSON_SUCCESS]: getFeaturesGeojsonSuccess,
  [Types.RESET_DATA_CLEANING_STATE]: resetDataCleaningState,
  [Types.SAVE_ATTRIBUTE_EDIT]: saveAttributeEdit,
  [Types.EXPLODE_FEATURE_REQUEST]: explodeFeatureRequest,
  [Types.EXPLODE_FEATURE_SUCCESS]: explodeFeatureSuccess,
  [Types.EXPLODE_FEATURE_FAILURE]: explodeFeatureFailure,
  [Types.GET_SELECTED_FEATURE_ATTRIBUTES_SUCCESS]:
    getSelectedFeatureAttributesSuccess,
  [Types.RESET_MANUAL_FIX_STATE]: resetManualFixState,
  [Types.GET_FEATURE_GEOJSON_SUCCESS]: getFeatureGeojsonSuccess,
  [Types.SPLIT_FEATURE_SUCCESS]: splitFeatureSuccess,
});

export default dataCleaningReducer;
