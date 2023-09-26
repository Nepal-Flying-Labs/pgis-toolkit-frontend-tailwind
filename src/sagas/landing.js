import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import toastActions from '@Actions/toast';
import { postRequestForDemo, getFileForDownload } from '@Services/landing';
import landingActions, { Types } from '@Actions/landing';
import { withLoader } from '@Utils/sagaUtils';

export function* postRequestForDemoRequest(action) {
  const { params } = action;
  try {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = yield call(postRequestForDemo, formData);
    yield put(
      landingActions.postRequestForDemoSuccess({ data: response.data }),
    );
    yield put(
      toastActions.success({
        message: 'Thank you! We will reach-out to you soon.',
      }),
    );
    yield put(landingActions.clearData());
  } catch (error) {
    // yield put(redirectActions.getStatusCode(error?.response?.status));
    // if (error?.response?.status >= 400) {
    //   yield put(push('/redirect'));
    // }
    yield put(landingActions.postRequestForDemoFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getFileForDownloadRequest(action) {
  const { params } = action;
  console.log(params, 'paramsx');
  try {
    const response = yield call(getFileForDownload, params);
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `template.zip`;
    link.click();
    yield put(
      toastActions.success({ message: 'File downloaded successfully.' }),
    );
  } catch (error) {
    console.log(error, 'errx');
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* landingWatcher() {
  yield takeLatest(
    Types.POST_REQUEST_FOR_DEMO_REQUEST,
    withLoader(postRequestForDemoRequest),
  );
  yield takeEvery(
    Types.GET_FILE_FOR_DOWNLOAD_REQUEST,
    withLoader(getFileForDownloadRequest),
  );
}

export default landingWatcher;
