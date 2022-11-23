import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogo from '@Assets/images/logo.png';
import HeaderProfile from './HeaderProfile';
import HeaderNotification from './HeaderNotification';

export default function Header() {
  return (
    <header className="naxatw-fixed naxatw-w-full naxatw-h-[4.5rem] naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300 naxatw-bg-white">
      <div className="naxatw-flex naxatw-justify-between naxatw-px-8 naxatw-py-3 naxatw-h-full">
        <Link to="/">
          <img className="naxatw-h-full" src={LoginLogo} alt="logo" />
        </Link>
        <nav className="">
          <ul className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-[0.9375rem] naxatw-tracking-wider naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-8 naxatw-h-full">
            <li>
              <Link to="/organizations">Organizations</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <div className="naxatw-flex naxatw-gap-4 naxatw-items-center">
          <HeaderNotification />

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
