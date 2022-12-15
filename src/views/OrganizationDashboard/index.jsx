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
import CreateNewUser from '@Components/OrganizationDashboard/ModalContent/CreateNewUser';

const {
  getOrganizationDetailRequest,
  toggleModal,
  resetOrganizationDashboardState,
} = OrganizationDashboardCreators;

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
    case 'create-new-user':
      return <CreateNewUser />;
    default:
      return '';
  }
}
function getModalTitle(modalContent) {
  switch (modalContent) {
    case 'create-new-user':
      return 'Create a new user';
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

  useEffect(
    () => () => {
      dispatch(resetOrganizationDashboardState());
      console.log('unmount');
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getOrganizationDetailRequest(organizationId));
  }, [dispatch, organizationId]);

  return tabname !== ('project-setup' && 'project-edit') ? (
    <div>
      <ProjectHeader />
      <Modal
        show={!!modalContent}
        title={getModalTitle(modalContent)}
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
