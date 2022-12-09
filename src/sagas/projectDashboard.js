import { call, put, takeLatest, all } from 'redux-saga/effects';
import projectDashboardActions, { Types } from '@Actions/projectDashboard';
import projectMapActions from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import commonActions from '@Actions/common';
import { withLoader } from '@Utils/sagaUtils';
import {
  getProjectDetail,
  getLayers,
  getLayerById,
} from '@Services/projectDashboard';
import {
  getProjectThemes,
  updateLayer,
  uploadLayer,
} from '@Services/projectMap';
import { defaultStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import prepareFormData from '@Utils/prepareFormData';

export function* getProjectDetailRequest({ params }) {
  try {
    const response = yield call(getProjectDetail, params);
    yield put(projectDashboardActions.getProjectDetailSuccess(response.data));
    yield put(projectMapActions.setMapConfig(response.data.data.map_config));
  } catch (error) {
    yield put(projectDashboardActions.getProjectDetailFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getProjectLayersRequest({ params }) {
  try {
    const response = yield call(getLayers, params);
    yield put(projectDashboardActions.getProjectLayersSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getProjectLayersFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* getCategoryListRequest({ params }) {
  try {
    const response = yield call(getProjectThemes, params);
    yield put(projectDashboardActions.getCategoryListSuccess(response.data));
  } catch (error) {
    yield put(projectDashboardActions.getCategoryListFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

export function* uploadDatasetsRequest({ payload }) {
  try {
    const responses = yield all(payload.map(data => call(uploadLayer, data)));
    const responsesData = responses.map(res => res.data);
    // const layerResponses = yield all(
    //   responsesData.map(item => {
    //     const data = prepareFormData({
    //       style: { ...defaultStyles },
    //     });
    //     return call(updateLayer, item.layer_id, data);
    //   }),
    // );
    const layerResponses = yield all(
      responsesData.map(item => call(getLayerById, item.layer_id)),
    );
    const layerData = layerResponses.map(res => res.data);
    yield put(projectDashboardActions.uploadDatasetsSuccess(layerData));
    yield put(commonActions.toggleModal());
  } catch (error) {
    yield put(projectDashboardActions.uploadDatasetsFailure());
    yield put(toastActions.error({ message: error?.response?.data?.detail }));
  }
}

function* projectDashboardWatcher() {
  yield takeLatest(
    Types.GET_PROJECT_DETAIL_REQUEST,
    withLoader(getProjectDetailRequest),
  );
  yield takeLatest(
    Types.GET_PROJECT_LAYERS_REQUEST,
    withLoader(getProjectLayersRequest),
  );
  yield takeLatest(
    Types.GET_CATEGORY_LIST_REQUEST,
    withLoader(getCategoryListRequest),
  );
  yield takeLatest(
    Types.UPLOAD_DATASETS_REQUEST,
    withLoader(uploadDatasetsRequest),
  );
}

export default projectDashboardWatcher;
