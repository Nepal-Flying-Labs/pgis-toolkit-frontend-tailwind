/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { Types } from '@Actions/dataCleaning';
import { parse } from 'wkt';
import flatten from '@turf/flatten';
import { checkErrorData, pointCheckExceptions } from '@src/constants/analysis';
import { pointTypes } from '@Components/common/OpenLayersComponent/helpers/styleUtils';

// const initialState = {
//   stepIndex: 1,
//   manualFix: {
//     sidebarContent: 'error-list', // 'error-list', 'add-feature', 'edit-feature'
//     drawFeatureId: null,
//     drawnFeatureWkt: null,
//     layerAttributes: null,
//     layerAttributesFields: null,
//     individualAttributeData: [],
//     refreshLayerId: null,
//     selectedError: null,
//     selectedErrorType: null,
//     selectedFeaturesForSnap: [],
//     geojsonFeatures: null,
//     selectedFeatureGeojson: null,
//     selectedFeatureAttributes: null,
//   },
//   selectedLayer: null, // selected layer for manual fix
//   errorFeaturesData: null,
//   optimalRoute: {
//     selectedRoadLayer: {},
//     selectedObstacleLayers: [], // []
//   },
//   errorStates: {},
// };

const initialState = {
  stepIndex: 2,
  manualFix: {
    sidebarContent: 'error-list',
    drawFeatureId: null,
    drawnFeatureWkt: null,
    layerAttributes: null,
    layerAttributesFields: [
      {
        id: 7154,
        name: 'id',
        alias: null,
        data_type: 'int',
        mandatory: true,
      },
      {
        id: 7155,
        name: 'Id_1',
        alias: null,
        data_type: 'int',
        mandatory: true,
      },
      {
        id: 7156,
        name: 'Name',
        alias: null,
        data_type: 'str',
        mandatory: true,
      },
    ],
    individualAttributeData: [
      {
        id: 7154,
        name: 'id',
        alias: null,
        data_type: 'int',
        mandatory: true,
        value: '',
      },
      {
        id: 7155,
        name: 'Id_1',
        alias: null,
        data_type: 'int',
        mandatory: true,
        value: '',
      },
      {
        id: 7156,
        name: 'Name',
        alias: null,
        data_type: 'str',
        mandatory: true,
        value: '',
      },
    ],
    refreshLayerId: null,
    selectedError: null,
    selectedErrorType: null,
    selectedFeaturesForSnap: [],
    geojsonFeatures: null,
    selectedFeatureGeojson: null,
    selectedFeatureAttributes: null,
  },
  selectedLayer: {
    id: 647,
    name: 'Test Error Network',
    layer_type: 'Vector',
    upload_status: 'successful',
    is_clean: false,
    icon: null,
    std_icon: null,
    style: {
      lineColor: '#2C675A',
      lineOpacity: 100,
      fillColor: '#e011b7',
      fillOpacity: 0,
      lineThickness: '5',
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
      85.41455437052994, 27.68873499036167, 85.41893721463556,
      27.695401775725283,
    ],
    geom_type: 'MultiLineString',
    sub_layer: [],
    theme: 479,
    checked: true,
  },
  errorFeaturesData: {
    null: [
      {
        id: 20138,
        checked: false,
      },
      {
        id: 20143,
        checked: false,
      },
      {
        id: 20153,
        checked: false,
      },
    ],
    multipart: [
      {
        id: 20139,
        checked: false,
      },
      {
        id: 20140,
        checked: false,
      },
      {
        id: 20141,
        checked: false,
      },
      {
        id: 20142,
        checked: false,
      },
      {
        id: 20149,
        checked: false,
      },
      {
        id: 20154,
        checked: false,
      },
      {
        id: 20144,
        checked: false,
      },
      {
        id: 20145,
        checked: false,
      },
      {
        id: 20146,
        checked: false,
      },
      {
        id: 20147,
        checked: false,
      },
      {
        id: 20148,
        checked: false,
      },
      {
        id: 20150,
        checked: false,
      },
      {
        id: 20151,
        checked: false,
      },
      {
        id: 20152,
        checked: false,
      },
    ],
    self_instersect: [
      {
        id: 20140,
        checked: false,
      },
      {
        id: 20141,
        checked: false,
      },
    ],
    snapping: [
      {
        id: 20140,
        checked: false,
      },
      {
        id: 20144,
        checked: false,
      },
      {
        id: 20150,
        checked: false,
      },
      {
        id: 20151,
        checked: false,
      },
      {
        id: 20152,
        checked: false,
      },
      {
        id: 20154,
        checked: false,
      },
    ],
  },
  optimalRoute: {
    selectedRoadLayer: {
      id: 647,
      name: 'Test Error Network',
      layer_type: 'Vector',
      upload_status: 'successful',
      is_clean: false,
      icon: null,
      std_icon: null,
      style: {
        lineColor: '#2C675A',
        lineOpacity: 100,
        fillColor: '#e011b7',
        fillOpacity: 0,
        lineThickness: '5',
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
        85.41455437052994, 27.68873499036167, 85.41893721463556,
        27.695401775725283,
      ],
      geom_type: 'MultiLineString',
      sub_layer: [],
      theme: 479,
      checked: true,
    },
    selectedObstacleLayers: [
      {
        id: 545,
        name: 'Sample Obstacle 2',
        layer_type: 'Vector',
        upload_status: 'successful',
        is_clean: false,
        icon: null,
        std_icon: null,
        style: {
          lineColor: '#2C675A',
          lineOpacity: 100,
          fillColor: '#9f8999',
          fillOpacity: 100,
          lineThickness: 2,
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
          geometryType: 'Point',
        },
        bbox: [
          85.33781939802816, 27.652739899999965, 85.35413949999989,
          27.664180636852794,
        ],
        geom_type: 'Point',
        sub_layer: [],
        theme: 480,
        checked: false,
      },
    ],
  },
  errorStates: {
    647: [
      {
        id: 'null',
        label: 'Null Geometry',
        checkAPI: 'check_null_geometry',
        fixAPI: 'fix_null_geometry',
        status: 'error',
        errorData: 3,
        totalData: 17,
        checked: false,
      },
      {
        id: 'multipart',
        label: 'Multipart Geometry',
        checkAPI: 'check_multipart_geometry',
        fixAPI: 'fix_multipart_geometry',
        status: 'error',
        errorData: 14,
        totalData: 17,
        checked: false,
      },
      {
        id: 'duplicate',
        label: 'Duplicate Geometry',
        checkAPI: 'check_duplicate_geometry',
        fixAPI: 'fix_duplicate_geometry',
        status: 'success',
        errorData: 0,
        totalData: 17,
        checked: false,
      },
      {
        id: 'overlapping',
        label: 'Overlapping Geometry',
        checkAPI: 'check_overlapping_geometry',
        fixAPI: 'fix_overlapping_geometry',
        status: 'success',
        errorData: 0,
        totalData: 17,
        checked: false,
      },
      {
        id: 'self_instersect',
        label: 'Self-Intersecting Geometry',
        checkAPI: 'check_self_intersecting_geometry',
        fixAPI: 'fix_self_intersecting_geometry',
        status: 'error',
        errorData: 2,
        totalData: 17,
        checked: false,
      },
      {
        id: 'isolated',
        label: 'Isolated Geometry',
        checkAPI: 'check_isolated_geometry',
        fixAPI: 'fix_isolated_geometry',
        status: 'error',
        errorData: 6,
        totalData: 17,
        checked: false,
      },
    ],
  },
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

const resetDataCleaningState = () => ({ ...initialState });

const getMultipartFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const { id, attributes, geometry } = action.payload;
    const geojson = parse(geometry);
    const explodedFeature = flatten(geojson);
    const explodedFeatureError = draft.errorFeaturesData.multipart.find(
      item => item.id === id,
    );
    explodedFeatureError.explodedFeatures = explodedFeature.features.map(
      (feature, index) => ({
        id: `${id}-${index + 1}`,
        attributes,
        geojson: feature,
      }),
    );
    explodedFeatureError.fixed = true;
  });

const saveAttributeEdit = (state, action) =>
  produce(state, draft => {
    const data = action.payload;
    if (state.manualFix.selectedErrorType === 'multipart') {
      const selectedFeatureAttribute = draft.errorFeaturesData.multipart.find(
        item => item.id === +draft.manualFix.selectedError.id.split('-')[0],
      );
      const selectedExplodedFeature =
        selectedFeatureAttribute.explodedFeatures.find(
          item => item.id === draft.manualFix.selectedError.id,
        );
      selectedExplodedFeature.attributes = data;
    }
    const {
      sidebarContent,
      selectedFeatureGeojson,
      selectedErrorType,
      individualAttributeData,
      selectedError,
    } = initialState.manualFix;
    draft.manualFix = {
      ...draft.manualFix,
      sidebarContent,
      selectedFeatureGeojson,
      selectedErrorType,
      individualAttributeData,
      selectedError,
    };
  });

const saveExplodedFeaturesSuccess = state =>
  produce(state, draft => {
    const { multipart } = draft.errorFeaturesData;
    draft.errorFeaturesData.multipart = multipart.filter(
      item => item.id !== draft.manualFix.selectedError.id,
    );
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
  [Types.GET_FEATURE_GEOJSON_SUCCESS]: getFeatureGeojsonSuccess,
  [Types.RESET_DATA_CLEANING_STATE]: resetDataCleaningState,
  [Types.GET_MULTIPART_FEATURE_SUCCESS]: getMultipartFeatureSuccess,
  [Types.SAVE_ATTRIBUTE_EDIT]: saveAttributeEdit,
  [Types.SAVE_EXPLODED_FEATURES_SUCCESS]: saveExplodedFeaturesSuccess,
});

export default dataCleaningReducer;
