import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/common';
import { projectHeaderHeight } from '@src/constants';
import useWindowDimensions from '@Hooks/useWindowDimentions';
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

const { setProjectHeaderHeight } = Creators;

export default function ProjectHeader() {
  const { organizationId, tabname, projectId } = useParams();
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const projectDetail = useSelector(
    state => state.projectDashboard.projectDetail,
  );
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const headerData = projectId ? projectHeaderData : organizationHeaderData;
  const headerTitle = projectId
    ? projectDetail?.name
    : organizationDetail?.name;

  useEffect(() => {
    if (!headerTitle) return;
    const el = document.getElementById('project-header');
    const dims = el.getBoundingClientRect();
    dispatch(setProjectHeaderHeight(dims.height));
  }, [dispatch, headerTitle, width]);

  return (
    <header
      id="project-header"
      className={`naxatw-h-[${projectHeaderHeight}] naxatw-fixed naxatw-w-full naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300 naxatw-bg-white`}
    >
      <div className="naxatw-flex naxatw-justify-between naxatw-px-8 naxatw-py-3 naxatw-h-full">
        <div className="naxatw-flex naxatw-items-center naxatw-gap-8">
          <Link
            to={`${
              projectId
                ? `/organizations/${organizationId}/projects`
                : '/organizations'
            }`}
          >
            <MaterialIcon name="arrow_back" />
          </Link>
          <h4>{headerTitle}</h4>
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
