import React from 'react';
import { useParams } from 'react-router';
import { projectHeaderHeight } from '@src/constants';
import ProjectHeader from '@Components/common/ProjectHeader';
import Projects from '@Components/OrganizationDashboard/Projects/index';
import Home from '@Components/OrganizationDashboard/Home/index';
import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';

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
  const { tabname } = useParams();

  return tabname !== 'project-setup' ? (
    <div>
      <ProjectHeader />

      <div className={`naxatw-mt-[${projectHeaderHeight}]`}>
        {getTabContent(tabname)}
      </div>
    </div>
  ) : (
    <ProjectSetup />
  );
}
