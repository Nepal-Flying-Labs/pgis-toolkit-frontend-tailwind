/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/common';
import { projectHeaderHeight } from '@src/constants';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import MaterialIcon from '@Components/common/MaterialIcon';
// import HeaderNotification from '../Header/HeaderNotification';
import AvatarIcon from '@Assets/images/user-avatar.png';
// import getImageSource from '@Utils/getImageSource';
import HeaderProfile from '../Header/HeaderProfile';

const organizationHeaderData = [
  { label: 'Organization Info', route: 'home', disabled: false },
  { label: 'Projects', route: 'projects', disabled: false },
  { label: 'User', route: 'user', disabled: false },
  { label: 'Settings', route: 'settings', disabled: false },
];

const projectHeaderData = [
  { label: 'Map', route: 'map', disabled: false },
  { label: 'Data', route: 'data', disabled: false },
  { label: 'Document', route: 'document', disabled: false },
  { label: 'Gallery', route: 'gallery', disabled: false },
  { label: 'Users', route: 'users', disabled: false },
  { label: 'Project Info', route: 'info', disabled: false },
  { label: 'Settings', route: 'settings', disabled: false },
];

const { setProjectHeaderHeight } = Creators;

export default function ProjectHeader() {
  const { organizationId, tabname, projectId } = useParams();
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const landingPage = useSelector(state => state.authentication.landingPage);

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
      <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-px-8  naxatw-h-full">
        {projectId ? (
          <div>
            <nav>
              <ul className="naxatw-font-bold  naxatw-text-grey-500 naxatw-text-[0.9375rem]  naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-2 naxatw-h-full">
                <li
                  className="naxatw-flex naxatw-gap-x-2 naxatw-items-center"
                  style={{
                    pointerEvents: landingPage?.project ? 'none' : '',
                  }}
                >
                  <Link
                    className="naxatw-py-2.5 hover:naxatw-text-[#484848] naxatw-text-body-btn hover:naxatw-underline"
                    to={`/organizations/${organizationId}/projects`}
                  >
                    {projectDetail?.organization_name}
                  </Link>
                </li>
                <li className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                  <MaterialIcon
                    name="chevron_right"
                    className="naxatw-text-[#484848]"
                  />
                  <a className=" naxatw-text-[#484848] naxatw-py-2.5 naxatw-text-body-btn">
                    {projectDetail?.name}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="naxatw-flex naxatw-items-center naxatw-gap-5 ">
            <Link
              className=""
              to="/organizations"
              style={{
                pointerEvents: landingPage?.organization ? 'none' : '',
              }}
            >
              <MaterialIcon
                name="arrow_back"
                className="naxatw-text-icon-md"
                wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
              />
            </Link>
            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
              <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
                <img
                  src={
                    organizationDetail?.cover_image
                      ? organizationDetail.cover_image
                      : AvatarIcon
                  }
                  alt="avatar-placeholder"
                  className="naxatw-rounded-full naxatw-w-[40px] naxatw-min-w-[40px] naxatw-h-[40px] naxatw-object-cover"
                />
              </figure>
              <h4>{headerTitle}</h4>
            </div>
          </div>
        )}

        <div className="naxatw-flex naxatw-gap-10 ">
          <nav className="">
            <ul className="naxatw-font-bold  naxatw-text-grey-500 naxatw-text-[0.9375rem] naxatw-tracking-wider naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-2 naxatw-h-full">
              {headerData.map(({ label, route, disabled }) => (
                <li key={label}>
                  <Link
                    className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 ${
                      tabname === route
                        ? 'naxatw-text-grey-800 naxatw-border-b-[2px] naxatw-border-grey-800'
                        : ''
                    } hover:naxatw-text-secondary-400 naxatw-text-body-btn`}
                    to={
                      projectId
                        ? `/organizations/${organizationId}/projects/${projectId}/${route}`
                        : `/organizations/${organizationId}/${route}`
                    }
                    style={{ pointerEvents: disabled ? 'none' : 'unset' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="naxatw-flex naxatw-gap-4 naxatw-items-center">
            {/* <HeaderNotification /> */}

            <HeaderProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
