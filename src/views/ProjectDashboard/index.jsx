import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { projectHeaderHeight } from '@src/constants';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import ManageDataCollection from '@Components/ProjectDashboard/ManageDataCollection/index';
import ProjectHeader from '@Components/common/ProjectHeader';
import Map from '@Components/ProjectDashboard/Map';
import Data from '@Components/ProjectDashboard/Data';
import Document from '@Components/ProjectDashboard/Document';
import Gallery from '@Components/ProjectDashboard/Gallery';
import Users from '@Components/ProjectDashboard/Users';
import Info from '@Components/ProjectDashboard/Info';
import Settings from '@Components/ProjectDashboard/Settings';
import Modal from '@Components/common/Modal';
import {
  getModalContent,
  getModalTitle,
  getPromptDialogContent,
  getPromptDialogTitle,
} from '@src/constants/modalContents';
import PromptDialog from '@Components/common/PromptDialog';
import AppLoader from '@Components/common/AppLoader';
import { isEmpty } from '@Utils/commonUtils';

const { toggleModal, togglePromptDialog } = CommonCreators;
const {
  getProjectLayersRequest,
  getProjectDetailRequest,
  resetProjectDashboardState,
} = ProjectDashboardCreators;

function getTabContent(tabname) {
  switch (tabname) {
    case 'map':
      return <Map />;
    case 'data':
      return <Data />;
    case 'document':
      return <Document />;
    case 'gallery':
      return <Gallery />;
    case 'users':
      return <Users />;
    case 'info':
      return <Info />;
    case 'settings':
      return <Settings />;
    default:
      return <Map />;
  }
}

export default function ProjectDashboard() {
  const { tabname, projectId, organizationId } = useParams();
  const history = useHistory();
  const modalContent = useSelector(state => state.common.modalContent);
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const layers = useSelector(state => state.projectDashboard.data.layers);
  const pushedToManageDataPage = useRef(false);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetProjectDashboardState());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getProjectDetailRequest({ project: projectId }));
    dispatch(getProjectLayersRequest({ project: projectId }));
  }, [dispatch, projectId]);

  if (!layers) {
    return <AppLoader />;
  }

  if (isEmpty(layers) && !pushedToManageDataPage.current) {
    pushedToManageDataPage.current = true;
    history.push(
      `/organizations/${organizationId}/projects/${projectId}/manage-data`,
    );
  }

  return tabname !== 'manage-data' ? (
    <div>
      <ProjectHeader />

      <PromptDialog
        show={!!promptDialogContent}
        title={getPromptDialogTitle(promptDialogContent)}
        onClose={() => dispatch(togglePromptDialog())}
      >
        {getPromptDialogContent(promptDialogContent)}
      </PromptDialog>

      <Modal
        show={!!modalContent}
        title={getModalTitle(modalContent)}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)}
      </Modal>

      <div
        style={{
          marginTop: projectHeaderHeight,
        }}
      >
        {getTabContent(tabname)}
      </div>
    </div>
  ) : (
    <ManageDataCollection />
  );
}
