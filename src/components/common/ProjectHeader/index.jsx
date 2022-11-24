import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectHeaderHeight } from '@src/constants';
import MaterialIcon from '@Components/common/MaterialIcon';
import HeaderNotification from '../Header/HeaderNotification/index';
import HeaderProfile from '../Header/HeaderProfile/index';

export default function ProjectHeader() {
  const { organizationId } = useParams();

  return (
    <header
      className={`naxatw-h-[${projectHeaderHeight}] naxatw-fixed naxatw-w-full naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300 naxatw-bg-white`}
    >
      <div className="naxatw-flex naxatw-justify-between naxatw-px-8 naxatw-py-3 naxatw-h-full">
        <div className="naxatw-flex">
          <Link to="/organizations">
            <MaterialIcon name="arrow_back" />
          </Link>
          <h4>World Bicycle Relief</h4>
        </div>

        <div className="naxatw-flex naxatw-gap-10">
          <nav className="">
            <ul className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-[0.9375rem] naxatw-tracking-wider naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-8 naxatw-h-full">
              <li>
                <Link to={`/organizations/${organizationId}/home`}>Home</Link>
              </li>
              <li>
                <Link to={`/organizations/${organizationId}/projects`}>
                  Projects
                </Link>
              </li>
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
