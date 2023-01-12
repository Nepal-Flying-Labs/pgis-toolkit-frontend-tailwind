/* eslint-disable no-nested-ternary */
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  getProjects,
  postProjectInvite,
  getIndividualProject,
  getOrganizationDetail,
  patchProject,
  getContactPerson,
  postContactPerson,
  patchContactPerson,
  getCountryList,
  getUsers,
  getUserGroup,
  updateUserRole,
  updateInvitedUserStatus,
  organizationById,
  updateOrganization,
} from '@Services/organizationDashboard';
import organizationDashboardActions, {
  Types,
} from '@Actions/organizationDashboard';
import commonActions from '@Actions/common';
import toastActions from '@Actions/toast';
import prepareFormData from '@Utils/prepareFormData';
import { withErrorHandler, withLoader } from '@Utils/sagaUtils';
import removeObjectKeys from '@Utils/removeObjectKeys';

export function* getOrganizationDetailRequest({ id }) {
  try {
    const response = yield call(getOrganizationDetail, id);
    yield put(
      organizationDashboardActions.getOrganizationDetailSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getOrganizationDetailFailure());
    throw error;
  }
}

export function* getProjectsRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getProjectsSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getProjectsFailure());
    throw error;
  }
}

export function* postProjectInviteRequest({ payload }) {
  const { organization } = payload;
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(commonActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Invitation sent success' }));
    yield put(
      organizationDashboardActions.getProjectsRequest({ organization }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    throw error;
  }
}

export function* getIndividualProjectRequest({ id }) {
  try {
    const response = yield call(getIndividualProject, id);
    yield put(
      organizationDashboardActions.getIndividualProjectSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getIndividualProjectFailure());
    throw error;
  }
}

export function* patchProjectRequest({ id, payload }) {
  const { status, organization, page, tabName } = payload;
  const newPayload = payload;
  delete newPayload.page;
  try {
    const formData = prepareFormData(newPayload);
    const response = yield call(patchProject, id, formData);
    yield put(organizationDashboardActions.patchProjectSuccess(response.data));
    // yield put(organizationDashboardActions.toggleModal(''));
    if (!page) {
      yield put(push(`/organizations/${organization}/projects`));
      if (status === 'ongoing' && tabName !== 'Edit a Project') {
        yield put(push(`/organizations/${organization}/projects`));
        yield put(commonActions.toggleModal('create-project-success'));
      } else {
        // yield put(commonActions.togglePromptDialog(''));
        yield put(push(`/organizations/${organization}/projects`));
      }
    } else {
      yield put(organizationDashboardActions.getIndividualProjectRequest(id));
    }
    if (status === 'draft') {
      yield put(commonActions.togglePromptDialog());
    }

    yield put(toastActions.success({ message: 'Data saved successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.patchProjectFailure());
    throw error;
  }
}

export function* getContactPersonRequest({ params }) {
  try {
    const formParams = removeObjectKeys(params, ['type']);
    const response = yield call(getContactPerson, formParams);
    yield put(
      organizationDashboardActions.getContactPersonSuccess({
        data: response.data,
        type: params.type,
      }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getContactPersonFailure());
    throw error;
  }
}

export function* postContactPersonRequest({ params, payload }) {
  const { type } = params;
  try {
    const formData = prepareFormData(payload);
    const formParams = removeObjectKeys(params, ['type']);
    const response = yield call(postContactPerson, formData, formParams);
    yield put(
      organizationDashboardActions.postContactPersonSuccess({
        data: response.data,
        type,
      }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.postContactPersonFailure());
    throw error;
  }
}
export function* patchContactPersonRequest({ payload, id }) {
  const formPayload = removeObjectKeys(payload, ['type']);
  try {
    const response = yield call(patchContactPerson, id, formPayload);
    yield put(
      organizationDashboardActions.patchContactPersonSuccess({
        data: response.data,
        type: payload.type,
      }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.patchContactPersonFailure());
    throw error;
  }
}

export function* getCountryListRequest() {
  try {
    const response = yield call(getCountryList);
    yield put(
      organizationDashboardActions.getCountryListSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getCountryListFailure());
    throw error;
  }
}

export function* getUsersRequest({ params }) {
  try {
    const response = yield call(getUsers, params);
    yield put(organizationDashboardActions.getUsersSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getUsersFailure());
  }
}

export function* getUserGroupRequest({ params }) {
  try {
    const response = yield call(getUserGroup, params);
    yield put(organizationDashboardActions.getUserGroupSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getUserGroupFailure());
  }
}

export function* getAllProjectRequest({ params }) {
  try {
    const response = yield call(getProjects, params);
    yield put(organizationDashboardActions.getAllProjectSuccess(response.data));
  } catch (error) {
    yield put(organizationDashboardActions.getAllProjectFailure());
    throw error;
  }
}

export function* postAssignUserRequest({ payload }) {
  const { organization } = payload;
  const { activeTab, ...newPayload } = payload;
  try {
    const formdata = prepareFormData(newPayload);
    const response = yield call(postProjectInvite, formdata);
    yield put(
      organizationDashboardActions.postProjectInviteSuccess(response.data),
    );
    yield put(push(`/organizations/${organization}/user`));
    if (activeTab === 'assign') {
      yield put(
        toastActions.success({
          message: 'User has been assigned successfully',
        }),
      );
    } else {
      yield put(
        toastActions.success({
          message: ' User has been invited and assigned successfully',
        }),
      );
    }
  } catch (error) {
    yield put(organizationDashboardActions.postProjectInviteFailure());
    throw error;
  }
}

export function* updateUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(
      organizationDashboardActions.updateUserStatusSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.updateUserStatusFailure());
    throw error;
  }
}

export function* deleteUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateUserRole, id, formdata);
    yield put(organizationDashboardActions.deleteUserSuccess(response.data));
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.deleteUserFailure());
    throw error;
  }
}

export function* updateInvitedUserStatusRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(
      organizationDashboardActions.updateInvitedUserStatusSuccess(
        response.data,
      ),
    );
    yield put(
      toastActions.success({ message: 'Invitation expire successful' }),
    );
  } catch (error) {
    yield put(organizationDashboardActions.updateInvitedUserStatusFailure());
    throw error;
  }
}

export function* deleteInvitedUserRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(
      organizationDashboardActions.deleteInvitedUserSuccess(response.data),
    );
    yield put(commonActions.togglePromptDialog());
    yield put(toastActions.success({ message: 'User deleted successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.deleteInvitedUserFailure());
    throw error;
  }
}

export function* resendInvitationRequest({ id, payload }) {
  try {
    const formdata = prepareFormData(payload);
    const response = yield call(updateInvitedUserStatus, id, formdata);
    yield put(organizationDashboardActions.resendInvitationSuccess({ id }));
    yield put(toastActions.success({ message: response.data.message }));
  } catch (error) {
    yield put(organizationDashboardActions.resendInvitationFailure());
    throw error;
  }
}

export function* updateOrganizationRequest({ id, payload }) {
  const newPayload = payload;
  delete newPayload.page;
  try {
    const formData = prepareFormData(newPayload);
    const response = yield call(updateOrganization, id, formData);
    yield put(
      organizationDashboardActions.updateOrganizationSuccess(response.data),
    );
    // yield put(organizationDashboardActions.toggleModal(''));
    yield put(toastActions.success({ message: 'Data saved successfully' }));
  } catch (error) {
    yield put(organizationDashboardActions.updateOrganizationFailure());
    throw error;
  }
}

export function* getOrganizationByIdRequest({ id }) {
  try {
    const response = yield call(organizationById, id);
    yield put(
      organizationDashboardActions.getOrganizationByIdSuccess(response.data),
    );
  } catch (error) {
    yield put(organizationDashboardActions.getOrganizationByIdFailure());
    throw error;
  }
}

function* organizationDashboardWatcher() {
  yield takeLatest(
    Types.GET_ORGANIZATION_DETAIL_REQUEST,
    withLoader(withErrorHandler(getOrganizationDetailRequest)),
  );
  yield takeLatest(
    Types.GET_PROJECTS_REQUEST,
    withLoader(withErrorHandler(getProjectsRequest)),
  );
  yield takeLatest(
    Types.POST_PROJECT_INVITE_REQUEST,
    withLoader(withErrorHandler(postProjectInviteRequest)),
  );
  yield takeLatest(
    Types.GET_INDIVIDUAL_PROJECT_REQUEST,
    withLoader(withErrorHandler(getIndividualProjectRequest)),
  );
  yield takeLatest(
    Types.PATCH_PROJECT_REQUEST,
    withLoader(withErrorHandler(patchProjectRequest)),
  );
  yield takeLatest(
    Types.GET_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(getContactPersonRequest)),
  );
  yield takeLatest(
    Types.POST_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(postContactPersonRequest)),
  );
  yield takeLatest(
    Types.PATCH_CONTACT_PERSON_REQUEST,
    withLoader(withErrorHandler(patchContactPersonRequest)),
  );
  yield takeLatest(
    Types.GET_COUNTRY_LIST_REQUEST,
    withLoader(withErrorHandler(getCountryListRequest)),
  );
  yield takeLatest(Types.GET_USERS_REQUEST, withLoader(getUsersRequest));
  yield takeLatest(
    Types.GET_USER_GROUP_REQUEST,
    withLoader(getUserGroupRequest),
  );
  yield takeLatest(
    Types.GET_ALL_PROJECT_REQUEST,
    withLoader(getAllProjectRequest),
  );
  yield takeLatest(
    Types.POST_ASSIGN_USER_REQUEST,
    withLoader(withErrorHandler(postAssignUserRequest)),
  );
  yield takeLatest(
    Types.UPDATE_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_USER_REQUEST,
    withLoader(withErrorHandler(deleteUserRequest)),
  );
  yield takeLatest(
    Types.UPDATE_INVITED_USER_STATUS_REQUEST,
    withLoader(withErrorHandler(updateInvitedUserStatusRequest)),
  );
  yield takeLatest(
    Types.DELETE_INVITED_USER_REQUEST,
    withLoader(withErrorHandler(deleteInvitedUserRequest)),
  );
  yield takeLatest(
    Types.RESEND_INVITATION_REQUEST,
    withLoader(withErrorHandler(resendInvitationRequest)),
  );
  yield takeLatest(
    Types.UPDATE_ORGANIZATION_REQUEST,
    withLoader(withErrorHandler(updateOrganizationRequest)),
  );
  yield takeLatest(
    Types.GET_ORGANIZATION_BY_ID_REQUEST,
    withLoader(withErrorHandler(getOrganizationByIdRequest)),
  );
}

export default organizationDashboardWatcher;
