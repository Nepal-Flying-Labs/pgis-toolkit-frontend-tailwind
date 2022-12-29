import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as OrganizationDashboardCreators } from '@Actions/organizationDashboard';
import ProjectHeader from '@Components/common/ProjectHeader';
import Projects from '@Components/OrganizationDashboard/Projects/index';
import User from '@Components/OrganizationDashboard/User/index';
import Home from '@Components/OrganizationDashboard/Home/index';
import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';

const { getOrganizationDetailRequest, resetOrganizationDashboardState } =
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

export default function OrganizationDashboard() {
  const { organizationId, tabname } = useParams();
  const dispatch = useDispatch();
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );

  useEffect(
    () => () => {
      dispatch(resetOrganizationDashboardState());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getOrganizationDetailRequest(organizationId));
  }, [dispatch, organizationId]);

  return tabname === 'project-setup' || tabname === 'project-edit' ? (
    <ProjectSetup />
  ) : (
    <div>
      <ProjectHeader />
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
