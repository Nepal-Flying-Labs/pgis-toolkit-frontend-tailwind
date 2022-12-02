import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { projectHeaderHeight } from '@src/constants';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import ProjectHeader from '@Components/common/ProjectHeader';
import Map from '@Components/ProjectDashboard/Map';
import Data from '@Components/ProjectDashboard/Data';
import Document from '@Components/ProjectDashboard/Document';
import Gallery from '@Components/ProjectDashboard/Gallery';
import Users from '@Components/ProjectDashboard/Users';
import Info from '@Components/ProjectDashboard/Info';
import Settings from '@Components/ProjectDashboard/Settings';
import Modal from '@Components/common/Modal';
import { getModalContent, getModalTitle } from '@src/constants/modalContents';

const { toggleModal } = CommonCreators;
const { getProjectDetailRequest } = ProjectDashboardCreators;

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
  const { tabname, projectId } = useParams();
  const modalContent = useSelector(state => state.common.modalContent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetailRequest({ project: projectId }));
  }, [dispatch, projectId]);

  return (
    <div>
      <ProjectHeader />

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
  );
}
