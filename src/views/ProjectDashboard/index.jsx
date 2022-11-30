import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { projectHeaderHeight } from '@src/constants';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import ProjectHeader from '@Components/common/ProjectHeader';
import Map from '@Components/ProjectDashboard/Map';
import Data from '@Components/ProjectDashboard/Data';
import Document from '@Components/ProjectDashboard/Document';
import Gallery from '@Components/ProjectDashboard/Gallery';
import Users from '@Components/ProjectDashboard/Users';
import Info from '@Components/ProjectDashboard/Info';
import Settings from '@Components/ProjectDashboard/Settings';
import { isEmpty } from '@Utils/commonUtils';
import Modal from '@Components/common/Modal';
import { getModalContent, getModalTitle } from '@src/constants/modalContents';

const { getProjectThemesRequest, getProjectThemeLayersRequest } =
  ProjectMapCreators;
const { toggleModal } = CommonCreators;

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
  const { projectId, tabname } = useParams();
  const themes = useSelector(state => state.projectMap.themes);
  const modalContent = useSelector(state => state.common.modalContent);
  const dispatch = useDispatch();

  // project map section
  useEffect(() => {
    dispatch(getProjectThemesRequest({ project: projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (isEmpty(themes)) return;
    themes.forEach(({ id }) => {
      dispatch(getProjectThemeLayersRequest({ theme: id }));
    });
  }, [dispatch, themes]);

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
