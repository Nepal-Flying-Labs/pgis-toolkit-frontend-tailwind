import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { projectHeaderHeight } from '@src/constants';
// import { Creators as CommonCreators } from '@Actions/common';
import { Creators as OrganizationDashboardCreators } from '@Actions/organizationDashboard';
import ProjectHeader from '@Components/common/ProjectHeader';
import Projects from '@Components/OrganizationDashboard/Projects/index';
import Home from '@Components/OrganizationDashboard/Home/index';
import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';
import Modal from '@Components/common/Modal/index';
import CreateProject from '@Components/OrganizationDashboard/ModalContent/CreateProject';

const { getOrganizationDetailRequest, toggleModal } =
  OrganizationDashboardCreators;

function getTabContent(tabname) {
  switch (tabname) {
    case 'home':
      return <Home />;
    case 'projects':
      return <Projects />;
    default:
      return <Home />;
  }
}

export default function OrganizationDashboard() {
  const { organizationId, tabname } = useParams();
  const dispatch = useDispatch();
  const modalContent = useSelector(
    state => state.organizationDashboard.modalContent,
  );

  useEffect(() => {
    dispatch(getOrganizationDetailRequest(organizationId));
  }, [dispatch, organizationId]);

  return tabname !== 'project-setup' ? (
    <div>
      <ProjectHeader />
      <Modal
        show={!!modalContent}
        title=""
        onClose={() => dispatch(toggleModal(''))}
      >
        <CreateProject />
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
