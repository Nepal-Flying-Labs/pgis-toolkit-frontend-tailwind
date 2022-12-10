import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// import { Creators as CommonCreators } from '@Actions/common';
import { Creators as OrganizationDashboardCreators } from '@Actions/organizationDashboard';
import ProjectHeader from '@Components/common/ProjectHeader';
import Projects from '@Components/OrganizationDashboard/Projects/index';
import User from '@Components/OrganizationDashboard/User/index';
import Home from '@Components/OrganizationDashboard/Home/index';
import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';
import Modal from '@Components/common/Modal/index';
import CreateProject from '@Components/OrganizationDashboard/ModalContent/CreateProject';
import CreateProjectSuccess from '@Components/OrganizationDashboard/ModalContent/CreateProjectSuccess';

const { getOrganizationDetailRequest, toggleModal } =
  OrganizationDashboardCreators;

function getTabContent(tabname) {
  switch (tabname) {
    case 'home':
      return <Home />;
    case 'projects':
      return <Projects />;
    case 'user':
      return <User />;
    default:
      return <Projects />;
  }
}

function getModalContent(modalContent) {
  switch (modalContent) {
    case 'create-project':
      return <CreateProject />;
    case 'create-project-success':
      return <CreateProjectSuccess />;
    default:
      return '';
  }
}

export default function OrganizationDashboard() {
  const { organizationId, tabname } = useParams();
  const dispatch = useDispatch();
  const modalContent = useSelector(
    state => state.organizationDashboard.modalContent,
  );
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  useEffect(() => {
    dispatch(getOrganizationDetailRequest(organizationId));
  }, [dispatch, organizationId]);

  return tabname !== ('project-setup' && 'project-edit') ? (
    <div>
      <ProjectHeader />
      <Modal
        show={!!modalContent}
        title=""
        onClose={() => dispatch(toggleModal(''))}
      >
        {getModalContent(modalContent)}
      </Modal>
      <Modal
        show={!!modalContent}
        title=""
        onClose={() => dispatch(toggleModal(''))}
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
    <ProjectSetup />
  );
}
