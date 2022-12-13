import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import LoginLogo from '@Assets/images/logo.png';
import HeaderProfile from './HeaderProfile';
// import HeaderNotification from './HeaderNotification';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="naxatw-fixed naxatw-w-full  naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300 naxatw-bg-white">
      <div className="naxatw-flex naxatw-justify-between naxatw-px-10 naxatw-py-1 naxatw-h-full">
        <Link to="/">
          <img
            className="naxatw-h-[47px] naxatw-w-[153px]"
            src={LoginLogo}
            alt="logo"
          />
        </Link>
        <nav className="">
          <ul className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-[0.9375rem] naxatw-tracking-wider naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-8 naxatw-h-full">
            <li
              className={`${
                pathname === '/organizations' ? 'naxatw-text-secondary-400' : ''
              } hover:naxatw-text-secondary-400`}
            >
              <Link to="/organizations">Organizations</Link>
            </li>
            <li
              className={`${
                pathname === '/users' ? 'naxatw-text-secondary-400' : ''
              } hover:naxatw-text-secondary-400`}
            >
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div className="naxatw-flex naxatw-gap-4 naxatw-items-center">
          {/* <HeaderNotification /> */}

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
