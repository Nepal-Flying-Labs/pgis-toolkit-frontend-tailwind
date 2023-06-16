import {
  call,
  all,
  put,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import proximityAnalysisActions, { Types } from '@Actions/proximityAnalysis';
import commonActions from '@Actions/common';
import { getFeatureCollection, updateLayer } from '@Services/projectMap';
import toastActions from '@Actions/toast';

import analysisActions from '@Actions/analysis';
import prepareFormData from '@Utils/prepareFormData';
// import toastActions from '@Actions/toast';
import {
  applyProximityAnalysis,
  getProximityAnalysisData,
  getProximityAreaCollection,
  saveProximityLayer,
  getFeatureCollectionMirror,
  downloadProximityAnalysis,
  deleteProximityResult,
} from '@Services/proximityAnalysis';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import { copyFeatures } from '@Services/dataCleaning';

export function* applyProximityAnalysisRequest({ payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(applyProximityAnalysis, formData);
    yield put(
      analysisActions.setAnalysisState({
        analysisTaskId: response.data.task_id,
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.applyProximityAnalysisFailure());
    throw error;
  }
}
export function* copyFeaturesRequest({ payload }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield all(
      payload.map(item =>
        call(copyFeatures, { layer: item, reset_data: true }),
      ),
    );
    // const response = yield call(copyFeatures, payload);
    yield put(
      proximityAnalysisActions.copyFeaturesSuccess({
        data: response.data,
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.copyFeaturesFailure());
    throw error;
  }
}
export function* getDetailsCategoryRequest({ params }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield call(getProximityAnalysisData, params);
    yield put(
      proximityAnalysisActions.getDetailsCategorySuccess({
        data: response.data,
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.getDetailsCategoryFailure());
    throw error;
  }
}
export function* getDetailsChartRequest({ params }) {
  // const formData = prepareFormData(payload);
  try {
    const response = yield call(getProximityAnalysisData, params);
    yield put(
      proximityAnalysisActions.getDetailsChartSuccess({
        data: response.data,
        key: params?.view,
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.getDetailsChartFailure());
    throw error;
  }
}

export function* getAnalysisDataRequest({ params }) {
  try {
    const response = yield call(getProximityAreaCollection, params);
    yield put(proximityAnalysisActions.getAnalysisDataSuccess(response.data));
  } catch (error) {
    yield put(proximityAnalysisActions.getAnalysisDataFailure());
    throw error;
  }
}

export function* getSelectedLayerFeatureRequest() {
  try {
    const { attributeList } = yield select(
      state => state.analysis.layerAttributesList,
    );
    const selectedFeature = attributeList.filter(item => item.checked);
    const response = yield all(
      selectedFeature.map(feature => call(getFeatureCollection, feature.id)),
    );
    const newResponse = response.map(res => res.data);
    yield put(
      proximityAnalysisActions.getSelectedLayerFeatureSuccess(newResponse),
    );
    yield put(commonActions.toggleModal());
  } catch (error) {
    yield put(proximityAnalysisActions.getSelectedLayerFeatureFailure());
    throw error;
  }
}

export function* saveProximityLayerRequest({ payload }) {
  try {
    const { style, ...newPayload } = payload;
    const response = yield call(saveProximityLayer, newPayload);
    const responseData = response.data;
    yield put(commonActions.togglePromptDialog());
    const { layers } = yield select(state => state.analysis);
    const { theme, layer } = responseData;
    // eslint-disable-next-line no-unused-expressions
    yield call(updateLayer, layer, prepareFormData({ style }));
    yield put(
      analysisActions.setAnalysisState({
        layers: {
          ...layers,
          [theme]: [
            {
              ...responseData,
              checked: true,
              layer_type: 'Vector',
              id: layer,
              style,
            },
            ...layers[theme],
          ],
        },
        zoomToLayerId: layer,
      }),
    );
    yield put(
      proximityAnalysisActions.saveProximityLayerSuccess({
        ...responseData,
        analysisId: payload.analysis,
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.saveProximityLayerFailure());
    throw error;
  }
}

export function* getFeatureCollectionRequest({ params }) {
  try {
    const response = yield call(getFeatureCollectionMirror, params);
    yield put(
      proximityAnalysisActions.getFeatureCollectionSuccess(response.data),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.getFeatureCollectionFailure());
    throw error;
  }
}

export function* downloadProximityAnalysisRequest({ params }) {
  try {
    const response = yield call(downloadProximityAnalysis, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ProximityAnalysis.zip';
    link.click();
    yield put(toastActions.success({ message: 'Export Completed.' }));
  } catch (error) {
    yield put(proximityAnalysisActions.downloadProximityAnalysisFailure());
    throw error;
  }
}

export function* deleteProximityResultRequest({ id, payload }) {
  const formData = prepareFormData(payload);
  try {
    const response = yield call(deleteProximityResult, id, formData);
    yield put(
      proximityAnalysisActions.deleteProximityResultSuccess(response.data),
    );

    yield put(commonActions.togglePromptDialog());

    yield put(
      toastActions.success({
        message: 'Result deleted successfully.',
      }),
    );
  } catch (error) {
    yield put(proximityAnalysisActions.deleteProximityResultFailure());
  }
}

function* proximityAnalysisWatcher() {
  yield takeLatest(
    Types.APPLY_PROXIMITY_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(applyProximityAnalysisRequest)),
  );
  yield takeLatest(
    Types.COPY_FEATURES_REQUEST,
    withLoader(withErrorHandler(copyFeaturesRequest)),
  );
  yield takeLatest(
    Types.GET_DETAILS_CATEGORY_REQUEST,
    withLoader(withErrorHandler(getDetailsCategoryRequest)),
  );
  yield takeEvery(
    Types.GET_DETAILS_CHART_REQUEST,
    withLoader(withErrorHandler(getDetailsChartRequest)),
  );
  yield takeLatest(
    Types.GET_ANALYSIS_DATA_REQUEST,
    withLoader(withErrorHandler(getAnalysisDataRequest)),
  );
  yield takeLatest(
    Types.GET_SELECTED_LAYER_FEATURE_REQUEST,
    withLoader(withErrorHandler(getSelectedLayerFeatureRequest)),
  );
  yield takeLatest(
    Types.SAVE_PROXIMITY_LAYER_REQUEST,
    withLoader(withErrorHandler(saveProximityLayerRequest)),
  );
  yield takeLatest(
    Types.GET_FEATURE_COLLECTION_REQUEST,
    withLoader(withErrorHandler(getFeatureCollectionRequest)),
  );
  yield takeLatest(
    Types.DOWNLOAD_PROXIMITY_ANALYSIS_REQUEST,
    withLoader(withErrorHandler(downloadProximityAnalysisRequest)),
  );
  yield takeLatest(
    Types.DELETE_PROXIMITY_RESULT_REQUEST,
    withLoader(withErrorHandler(deleteProximityResultRequest)),
  );
}

export default proximityAnalysisWatcher;
