import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectHeaderHeight } from '@src/constants';
import MaterialIcon from '@Components/common/MaterialIcon';
import HeaderNotification from '../Header/HeaderNotification';
import HeaderProfile from '../Header/HeaderProfile';

const organizationHeaderData = [
  { label: 'Home', route: 'home' },
  { label: 'Projects', route: 'projects' },
  { label: 'User', route: 'user' },
  { label: 'Settings', route: 'settings' },
];

const projectHeaderData = [
  { label: 'Map', route: 'map' },
  { label: 'Data', route: 'data' },
  { label: 'Document', route: 'document' },
  { label: 'Gallery', route: 'gallery' },
  { label: 'Users', route: 'users' },
  { label: 'Info.', route: 'info' },
  { label: 'Settings', route: 'settings' },
];

export default function ProjectHeader() {
  const { organizationId, tabname, projectId } = useParams();

  const headerData = projectId ? projectHeaderData : organizationHeaderData;

  return (
    <header
      className={`naxatw-h-[${projectHeaderHeight}] naxatw-fixed naxatw-w-full naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300 naxatw-bg-white`}
    >
      <div className="naxatw-flex naxatw-justify-between naxatw-px-8 naxatw-py-3 naxatw-h-full">
        <div className="naxatw-flex">
          <Link
            to={`${
              projectId
                ? `/organizations/${organizationId}/home`
                : '/organizations'
            }`}
          >
            <MaterialIcon name="arrow_back" />
          </Link>
          <h4>World Bicycle Relief</h4>
        </div>

        <div className="naxatw-flex naxatw-gap-10">
          <nav className="">
            <ul className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-[0.9375rem] naxatw-tracking-wider naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-8 naxatw-h-full">
              {headerData.map(({ label, route }) => (
                <li
                  key={label}
                  className={`${
                    tabname === route ? 'naxatw-text-grey-800' : ''
                  }`}
                >
                  <Link
                    to={
                      projectId
                        ? `/organizations/${organizationId}/projects/${projectId}/${route}`
                        : `/organizations/${organizationId}/${route}`
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="naxatw-flex naxatw-gap-4 naxatw-items-center">
            <HeaderNotification />

            <HeaderProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
