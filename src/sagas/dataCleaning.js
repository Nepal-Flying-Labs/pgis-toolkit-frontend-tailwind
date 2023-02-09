import {
  call,
  all,
  put,
  select,
  takeLatest,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { stringify, parse } from 'wkt';
import flatten from '@turf/flatten';
import {
  autoFixError,
  bulkDeleteNullGeometry,
  checkError,
  copyFeatures,
  getErrorFeatures,
  getFeatureCollectionMirror,
  getFeatureMirrorGeojson,
  postFeatureCollection,
  updateFeatureCollection,
} from '@Services/dataCleaning';
import dataCleaningActions, { Types } from '@Actions/dataCleaning';
import commonActions from '@Actions/common';
import analysisActions from '@Actions/analysis';
import routeAnalysisActions from '@Actions/routeAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { getLayerAttributeFields } from '@Services/projectMap';
import { isEmpty } from '@Utils/commonUtils';
import { roadLayersThemeIdSelector } from '@Selectors/projectMap';
import { checkErrorData } from '@src/constants/analysis';

export function* checkErrorRequest({ payload }) {
  try {
    const { layerId, geometryType } = payload;
    yield put(dataCleaningActions.setErrorStates({ layerId, geometryType }));
    yield call(copyFeatures, { layer: layerId.toString() });
    const { errorStates } = yield select(state => state.dataCleaning);
    const errorData = errorStates[layerId];
    for (let i = 0; i < errorData.length; i += 1) {
      const { id, checkAPI } = errorData[i];
      yield put(
        dataCleaningActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'checking',
        }),
      );
      const params = { layer: layerId };
      const response = yield call(checkError, checkAPI, params);
      yield put(
        dataCleaningActions.checkErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(dataCleaningActions.checkErrorFailure());
    throw error;
  }
}

export function* autoFixErrorRequest({ params }) {
  try {
    const layerId = params.layer;
    const { errorStates } = yield select(state => state.dataCleaning);
    const checkedErrorData = errorStates[layerId].filter(item => item.checked);
    for (let i = 0; i < checkedErrorData.length; i += 1) {
      const { id, fixAPI } = checkedErrorData[i];
      yield put(
        dataCleaningActions.setErrorCheckingStatus({
          layerId,
          id,
          status: 'fixing',
        }),
      );
      const response = yield call(autoFixError, fixAPI, params);
      yield put(
        dataCleaningActions.autoFixErrorSuccess({
          ...response.data,
          id,
          layerId,
        }),
      );
    }
  } catch (error) {
    yield put(dataCleaningActions.autoFixErrorFailure());
    throw error;
  }
}

export function* getErrorFeaturesRequest({ params }) {
  try {
    const response = yield call(getErrorFeatures, params);
    yield put(dataCleaningActions.getErrorFeaturesSuccess(response.data));
  } catch (error) {
    yield put(dataCleaningActions.getErrorFeaturesFailure());
    throw error;
  }
}

export function* getLayerAttributeFieldsRequest({ params }) {
  try {
    const response = yield call(getLayerAttributeFields, params);
    yield put(
      dataCleaningActions.getLayerAttributeFieldsSuccess(response.data),
    );
  } catch (error) {
    yield put(dataCleaningActions.getLayerAttributeFieldsFailure());
    throw error;
  }
}

export function* updateFeatureCollectionRequest({ id, payload }) {
  try {
    const response = yield call(updateFeatureCollection, id, payload);
    yield put(
      dataCleaningActions.updateFeatureCollectionSuccess(response.data),
    );
  } catch (error) {
    yield put(dataCleaningActions.updateFeatureCollectionFailure());
    throw error;
  }
}

export function* deleteFeatureRequest({ id }) {
  try {
    const payload = { is_deleted: true };
    yield call(updateFeatureCollection, id, payload);
    yield put(dataCleaningActions.deleteFeatureSuccess());
    yield put(commonActions.togglePromptDialog());
  } catch (error) {
    yield put(dataCleaningActions.deleteFeatureFailure());
    throw error;
  }
}

export function* deleteSelectedFeaturesRequest() {
  try {
    const { errorFeaturesData } = yield select(state => state.dataCleaning);
    const nullErrors = errorFeaturesData.null;
    const checkedErrors = nullErrors
      .filter(item => item.checked)
      .map(item => item.id);
    if (isEmpty(checkedErrors)) {
      return;
    }
    const payload = {
      feature_ids: JSON.stringify(checkedErrors),
    };
    yield call(bulkDeleteNullGeometry, payload);
    yield put(dataCleaningActions.deleteSelectedFeaturesSuccess(checkedErrors));
  } catch (error) {
    yield put(dataCleaningActions.deleteSelectedFeaturesFailure());
    throw error;
  }
}

export function* getFeatureGeojsonRequest({ payload }) {
  try {
    const responses = yield all(
      payload.map(id => call(getFeatureMirrorGeojson, { mirror_id: id })),
    );
    const responseData = responses.map(res => res.data);
    yield put(dataCleaningActions.getFeatureGeojsonSuccess(responseData));
  } catch (error) {
    yield put(dataCleaningActions.getFeatureGeojsonFailure());
    throw error;
  }
}

export function* startAnalysisRequest({ params }) {
  try {
    const { organizationId, projectId, analysisType } = params;
    const { selectedRoadLayer, selectedObstacleLayers } = yield select(
      state => state.dataCleaning.optimalRoute,
    );
    if (analysisType === 'optimal-route') {
      yield put(
        routeAnalysisActions.setRouteAnalysisState({
          roadNetworkLayer: selectedRoadLayer,
          obstacleLayers: selectedObstacleLayers.map(item => ({
            ...item,
            checked: false,
          })),
        }),
      );
      const roadLayersThemeId = yield select(roadLayersThemeIdSelector);
      const { layers } = yield select(state => state.analysis);
      yield put(
        analysisActions.setAnalysisState({
          layers: {
            ...layers,
            [roadLayersThemeId]: layers[roadLayersThemeId].map(item =>
              item.id === selectedRoadLayer.id
                ? { ...item, checked: true }
                : { ...item },
            ),
          },
        }),
      );
      yield put(
        push(
          `/organizations/${organizationId}/projects/${projectId}/analysis/${analysisType}`,
        ),
      );
    }
    // yield put(dataCleaningActions.startAnalysisSuccess(responseData));
  } catch (error) {
    yield put(dataCleaningActions.startAnalysisFailure());
    throw error;
  }
}

export function* explodeFeatureRequest({ payload }) {
  try {
    const layerResponse = yield call(getFeatureCollectionMirror, payload);
    const { id, attributes, geometry } = layerResponse.data;
    const { selectedLayer } = yield select(state => state.dataCleaning);
    const geojson = parse(geometry);
    const explodedFeature = flatten(geojson);
    // post new exploded layers
    const explodeResponse = yield all(
      explodedFeature.features.map(feature =>
        call(postFeatureCollection, {
          attributes,
          geometry: stringify(feature),
          layer: selectedLayer.id,
        }),
      ),
    );
    // delete old layer
    yield call(updateFeatureCollection, id, { is_deleted: true });
    yield put(
      dataCleaningActions.explodeFeatureSuccess({
        layerData: layerResponse.data,
        explodeData: explodeResponse.map(item => item.data),
      }),
    );
  } catch (error) {
    yield put(dataCleaningActions.explodeFeatureFailure(payload));
    throw error;
  }
}

export function* validateErrorFixRequest({ payload }) {
  try {
    yield delay(2000);
    const { layerId } = payload;
    const { errorFeaturesData } = yield select(state => state.dataCleaning);
    const data = Object.keys(errorFeaturesData);
    yield all(
      data.map(item => {
        const checkAPI = checkErrorData.find(
          i => i.id === item || i.alternativeId === item,
        )?.checkAPI;
        const params = { layer: layerId };
        return call(checkError, checkAPI, params);
      }),
    );
    yield put(dataCleaningActions.getErrorFeaturesRequest({ layer: layerId }));
  } catch (error) {
    yield put(dataCleaningActions.validateErrorFixFailure());
    throw error;
  }
}

function* dataCleaningWatcher() {
  yield takeEvery(
    Types.CHECK_ERROR_REQUEST,
    withLoader(withErrorHandler(checkErrorRequest)),
  );
  yield takeEvery(
    Types.AUTO_FIX_ERROR_REQUEST,
    withLoader(withErrorHandler(autoFixErrorRequest)),
  );
  yield takeLatest(
    Types.GET_ERROR_FEATURES_REQUEST,
    withLoader(withErrorHandler(getErrorFeaturesRequest)),
  );
  yield takeLatest(
    Types.GET_LAYER_ATTRIBUTE_FIELDS_REQUEST,
    withLoader(withErrorHandler(getLayerAttributeFieldsRequest)),
  );
  yield takeLatest(
    Types.UPDATE_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(updateFeatureCollectionRequest)),
  );
  yield takeLatest(
    Types.DELETE_FEATURE_REQUEST,
    withLoader(withErrorHandler(deleteFeatureRequest)),
  );
  yield takeLatest(
    Types.DELETE_SELECTED_FEATURES_REQUEST,
    withLoader(withErrorHandler(deleteSelectedFeaturesRequest)),
  );
  yield takeLatest(
    Types.GET_FEATURE_GEOJSON_REQUEST,
    withLoader(withErrorHandler(getFeatureGeojsonRequest)),
  );
  yield takeLatest(
    Types.START_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(startAnalysisRequest)),
  );
  yield takeEvery(
    Types.EXPLODE_FEATURE_REQUEST,
    withLoader(withErrorHandler(explodeFeatureRequest)),
  );
  yield takeEvery(
    Types.VALIDATE_ERROR_FIX_REQUEST,
    withLoader(withErrorHandler(validateErrorFixRequest)),
  );
}

export default dataCleaningWatcher;
