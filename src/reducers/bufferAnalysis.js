/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { parse } from 'wkt';
import * as chroma from 'chroma-js';
import {
  bufferPolygonStyles,
  bufferPointStyles,
  bufferColors,
} from '@src/constants/analysis';
import { Types } from '@Actions/bufferAnalysis';
import { isEmpty } from '@Utils/commonUtils';

const initialState = {
  activeTab: 'dataInput', // 'dataInput', 'results', 'layers'
  dataInput: {
    originPointType: 'map', // 'search', 'map', 'layer'
    selectedOriginPointType: null, // 'search', 'map', 'layer'
    drawPoint: false,
    originGeojson: null,
    bufferRadius: 1,
    dissolveOutput: false,
    outputName: '',
  },
  results: {
    analysisResults: [
      {
        id: 488,
        name: 'proximity 10499',
        geom_type: 'Polygon',
        bbox: [
          85.40192738862527, 27.67590411058972, 85.48727177156752,
          27.698542146255406,
        ],
        total_area: 6273096.981090842,
        buffer_areas: [
          {
            id: 538,
            area: 3136548.490545421,
            bbox: [
              85.46930546588511, 27.67590411058972, 85.48727177156752,
              27.69181371515093,
            ],
            origin: [[85.47828861872631, 27.6838592025899]],
            poi: [
              {
                layer_id: 688,
                layer_name: 'Health Institutions',
                feature_mirror_ids: [103190],
              },
              {
                layer_id: 689,
                layer_name: 'Government Office',
                feature_mirror_ids: [103209],
              },
            ],
            name: 'Point 1',
            checked: true,
            style: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#FF5A5F',
              fillOpacity: 33,
              lineThickness: 2,
              circleRadius: 8,
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
            },
            originStyle: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#91949f',
              fillOpacity: 100,
              lineThickness: 2,
              circleRadius: 8,
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
            },
          },
          {
            id: 539,
            area: 3136548.490545421,
            bbox: [
              85.40192738862527, 27.682633522092363, 85.41989369430765,
              27.698542146255406,
            ],
            origin: [[85.41091054146646, 27.690588123940458]],
            poi: [
              {
                layer_id: 688,
                layer_name: 'Health Institutions',
                feature_mirror_ids: [
                  103204, 103201, 103202, 103203, 103196, 103197, 103198,
                  103199, 103200,
                ],
              },
              {
                layer_id: 689,
                layer_name: 'Government Office',
                feature_mirror_ids: [],
              },
            ],
            name: 'Point 2',
            checked: true,
            style: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#FF5A5F',
              fillOpacity: 33,
              lineThickness: 2,
              circleRadius: 8,
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
            },
            originStyle: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#26f183',
              fillOpacity: 100,
              lineThickness: 2,
              circleRadius: 8,
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
            },
          },
        ],
        checked: true,
        poiChartData: [
          {
            name: 'Health Institutions',
            count: 10,
          },
          {
            name: 'Government Office',
            count: 1,
          },
        ],
        inputQuery: {
          origins: [
            [85.47828861872631, 27.6838592025899],
            [85.41091054146646, 27.690588123940458],
          ],
          dissolve_output: false,
          radius: 1000,
          name: 'proximity 10499',
          project: '295',
          pois: [688, 689],
          type: 'buffer',
          selectedPOIName: ['Health Institutions', 'Government Office'],
          analysisType: 'proximity-analysis',
        },
        style: {
          lineColor: '#FFFFFF',
          lineOpacity: 100,
          fillColor: '#FF5A5F',
          fillOpacity: '50',
          lineThickness: 2,
          circleRadius: 8,
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
        },
      },
      {
        id: 487,
        name: 'proximity 10489',
        geom_type: 'Polygon',
        bbox: [
          85.41357923657245, 27.69100732180394, 85.45653791176476,
          27.718575462078956,
        ],
        total_area: 6273096.981090842,
        buffer_areas: [
          {
            id: 536,
            area: 3136548.490545421,
            bbox: [
              85.41357923657245, 27.702669758265095, 85.43154554225482,
              27.718575462078956,
            ],
            origin: [[85.42256238941364, 27.71062290007842]],
            poi: [],
            name: 'Point 1',
            checked: true,
            style: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#FF5A5F',
              fillOpacity: 33,
              lineThickness: 2,
              circleRadius: 8,
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
            },
            originStyle: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#c011f0',
              fillOpacity: 100,
              lineThickness: 2,
              circleRadius: 8,
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
            },
          },
          {
            id: 537,
            area: 3136548.490545421,
            bbox: [
              85.43857160608235, 27.69100732180394, 85.45653791176476,
              27.706914725693906,
            ],
            origin: [[85.44755475892356, 27.698961313573946]],
            poi: [],
            name: 'Point 2',
            checked: true,
            style: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#FF5A5F',
              fillOpacity: 33,
              lineThickness: 2,
              circleRadius: 8,
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
            },
            originStyle: {
              lineColor: '#FFFFFF',
              lineOpacity: 100,
              fillColor: '#6e1235',
              fillOpacity: 100,
              lineThickness: 2,
              circleRadius: 8,
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
            },
          },
        ],
        checked: true,
        poiChartData: [],
        inputQuery: {
          origins: [
            [85.42256238941364, 27.71062290007842],
            [85.44755475892356, 27.698961313573946],
          ],
          dissolve_output: false,
          radius: 1000,
          name: 'proximity 10489',
          project: '295',
          pois: [],
          type: 'buffer',
          selectedPOIName: [],
          analysisType: 'proximity-analysis',
        },
        style: {
          lineColor: '#FFFFFF',
          lineOpacity: 100,
          fillColor: '#DFF2F1',
          fillOpacity: '50',
          lineThickness: 2,
          circleRadius: 8,
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
        },
      },
    ],

    // analysisResults: [analysisResultData],
    zoomToBuffer: null,
    showResultsPopup: false,
    selectedResultId: null,
    selectedAnalysis: null,
    individualAnalysisData: null,
  },
  inputQuery: null,
  analysisTaskId: null,
  poiLayers: [],
  popupActiveTab: 'Summary',
  detailsCategory: [],
  detailsChartData: {},
  detailsListData: [],
  featureCollectionList: [],
  filter: {
    searchText: '',
    ordering: null,
  },
  selectedLayer: null,
  selectedCategory: null,
};

const setBufferAnalysisState = (state, action) => ({
  ...state,
  ...action.payload,
});

const setFilterState = (state, action) => ({
  ...state,
  filter: {
    ...state.filter,
    ...action.payload,
  },
});

const setDataInputState = (state, action) => ({
  ...state,
  dataInput: {
    ...state.dataInput,
    ...action.payload,
  },
});

const setResultsState = (state, action) => ({
  ...state,
  results: {
    ...state.results,
    ...action.payload,
  },
});

const resetBufferAnalysisState = () => ({ ...initialState });

const applyBufferAnalysisSuccess = (state, action) =>
  produce(state, draft => {
    draft.analysisTaskId = action.payload.task_id;
  });

const handleCheckbox = (state, action) =>
  produce(state, draft => {
    const { stateName, id, checked } = action.payload;
    const selectedData = draft[stateName].find(item => item.id === +id);
    selectedData.checked = checked;
  });

const checkProcessingStatusSuccess = (state, action) =>
  produce(state, draft => {
    const totalPoiCountChartData = [];
    const data = action.payload;
    data.buffer_areas.forEach(bufarea => {
      bufarea.poi.forEach(poiArea => {
        const existingLayerCheck = totalPoiCountChartData.findIndex(
          layer => layer.name === poiArea.layer_name,
        );
        if (existingLayerCheck !== -1) {
          totalPoiCountChartData[existingLayerCheck].count +=
            poiArea.feature_mirror_ids.length;
        } else {
          totalPoiCountChartData.push({
            name: poiArea.layer_name,
            count: poiArea.feature_mirror_ids.length,
          });
        }
      });
    });
    const { analysisType } = draft.inputQuery;
    const analysisResult = {
      ...data,
      checked: true,
      poiChartData: totalPoiCountChartData,
      buffer_areas: data.buffer_areas.map((areas, index) => ({
        ...areas,
        name: `${analysisType === 'buffer-analysis' ? 'Buffer ' : ''}Area ${
          index + 1
        }`,
        checked: true,
        style: { ...bufferPolygonStyles },
        originStyle: { ...bufferPointStyles, fillColor: chroma.random().hex() },
      })),
      inputQuery: draft.inputQuery,
    };

    draft.dataInput = initialState.dataInput;
    draft.inputQuery = initialState.inputQuery;
    draft.results.analysisResults = [
      analysisResult,
      ...draft.results.analysisResults,
    ];
    const analysisResultStyle = draft.results.analysisResults.map(
      (result, i) => ({
        ...result,
        style: {
          ...bufferPolygonStyles,
          fillColor: bufferColors[i + 1] || chroma.random().hex(),
          fillOpacity: '50',
        },
      }),
    );
    draft.results.analysisResults = analysisResultStyle;
    draft.activeTab = 'results';
    draft.results.selectedResultId = analysisResult.id;
    draft.results.showResultsPopup = true;

    draft.poiLayers = draft.poiLayers.map(item => ({
      ...item,
      checked: false,
    }));
  });

const handleRouteCheckbox = (state, action) =>
  produce(state, draft => {
    const { resultId, areaId, checked, name } = action.payload;
    const result = draft.results.analysisResults.find(
      item => item.id === resultId,
    );
    if (name === 'result') {
      result.checked = checked;
      result.buffer_areas.forEach(area => {
        area.checked = checked;
      });
      if (!checked) {
        draft.analysisId = null;
        draft.selectedRouteId = null;
      }
      return;
    }
    const area = result.buffer_areas.find(item => item.id === areaId);

    if (name === 'area') {
      area.checked = checked;
      const checkedAreas = result.buffer_areas.filter(item => item.checked);
      if (isEmpty(checkedAreas)) {
        result.checked = false;
      } else {
        result.checked = true;
      }
    }
  });
const setPopupActiveTab = (state, action) => ({
  ...state,
  popupActiveTab: action.payload,
});
const getDetailsCategorySuccess = (state, action) => ({
  ...state,
  detailsCategory: action.payload,
});
const getDetailsChartSuccess = (state, action) => {
  if (action?.payload?.key === 'chart') {
    return {
      ...state,
      detailsChartData: action.payload,
    };
  }
  return {
    ...state,
    detailsListData: action.payload,
  };
};

const getAnalysisDataSuccess = (state, action) =>
  produce(state, draft => {
    draft.results.individualAnalysisData = action.payload;
  });

function getAttributeName(attributes) {
  return attributes?.name || attributes?.Name;
}

const getSelectedLayerFeatureSuccess = (state, action) =>
  produce(state, draft => {
    const { originGeojson } = draft.dataInput;
    const data = action.payload;
    const newData = data.map((item, index) => {
      const { geometry, attributes, id } = item;
      const geojson = parse(geometry);
      const originLength = originGeojson?.length || 0;

      return {
        id: originLength + (index + 1),
        name: getAttributeName(attributes) || id,
        geojson: { ...geojson, geometry: { coordinates: geojson.coordinates } },
      };
    });

    draft.dataInput.originGeojson = originGeojson
      ? [...originGeojson, ...newData]
      : newData;
  });

const saveBufferLayerSuccess = (state, action) =>
  produce(state, draft => {
    const { analysisId } = action.payload;
    draft.results.analysisResults = draft.results.analysisResults.filter(
      item => item.id !== analysisId,
    );
    draft.activeTab = 'layers';
    draft.selectedResultId = null;
    draft.results.showResultsPopup = false;
  });

const deleteBufferResult = (state, action) =>
  produce(state, draft => {
    const selectedId = draft.results.selectedResultId;
    if (selectedId === action.payload) {
      draft.results.showResultsPopup = false;
      draft.results.selectedResultId = null;
    }
    const newData = draft.results.analysisResults.filter(
      item => item.id !== action.payload,
    );
    draft.results.analysisResults = newData;
    if (newData.length < 1) {
      draft.activeTab = 'dataInput';
    }
  });

const getFeatureCollectionSuccess = (state, action) => {
  const featureList = action.payload;
  const listData = state.detailsListData;
  const newFeatureList = featureList.map(list => {
    const resultData = listData.data.find(datax => datax.id === list.id);
    if (resultData) {
      return {
        ...list,
        buffer_distance: resultData.buffer_distance,
        origin: resultData.origin,
      };
    }
    return list;
  });
  return {
    ...state,
    featureCollectionList: newFeatureList,
  };
};

const bufferAnalysisReducer = createReducer(initialState, {
  [Types.SET_BUFFER_ANALYSIS_STATE]: setBufferAnalysisState,
  [Types.SET_FILTER_STATE]: setFilterState,
  [Types.SET_DATA_INPUT_STATE]: setDataInputState,
  [Types.SET_RESULTS_STATE]: setResultsState,
  [Types.RESET_BUFFER_ANALYSIS_STATE]: resetBufferAnalysisState,
  [Types.APPLY_BUFFER_ANALYSIS_SUCCESS]: applyBufferAnalysisSuccess,
  [Types.HANDLE_CHECKBOX]: handleCheckbox,
  [Types.CHECK_PROCESSING_STATUS_SUCCESS]: checkProcessingStatusSuccess,
  [Types.HANDLE_ROUTE_CHECKBOX]: handleRouteCheckbox,
  [Types.SET_POPUP_ACTIVE_TAB]: setPopupActiveTab,
  [Types.GET_DETAILS_CATEGORY_SUCCESS]: getDetailsCategorySuccess,
  [Types.GET_DETAILS_CHART_SUCCESS]: getDetailsChartSuccess,
  [Types.GET_ANALYSIS_DATA_SUCCESS]: getAnalysisDataSuccess,
  [Types.GET_SELECTED_LAYER_FEATURE_SUCCESS]: getSelectedLayerFeatureSuccess,
  [Types.SAVE_BUFFER_LAYER_SUCCESS]: saveBufferLayerSuccess,
  [Types.DELETE_BUFFER_RESULT]: deleteBufferResult,
  [Types.GET_FEATURE_COLLECTION_SUCCESS]: getFeatureCollectionSuccess,
});

export default bufferAnalysisReducer;
