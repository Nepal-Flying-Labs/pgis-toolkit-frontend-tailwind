import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogo from '@Assets/images/logo.png';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import NotificationIcon from '@Assets/images/icons/notification-icon.svg';

export default function Header() {
  return (
    <header className="naxatw-fixed naxatw-w-full naxatw-z-[999] naxatw-top-0 naxatw-border-b naxatw-border-grey-300">
      <div className="">
        <div className="naxatw-flex naxatw-justify-between naxatw-px-16 naxatw-py-6">
          <Link to="/">
            <img className="naxatw-h-16" src={LoginLogo} alt="logo" />
          </Link>
          <nav className="">
            <ul className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-2xl naxatw-flex naxatw-items-center naxatw-justify-center naxatw-gap-16 naxatw-h-full">
              <li>
                <Link to="/organizations">Organizations</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <div className="naxatw-flex naxatw-gap-4">
            <figure className="naxatw-w-16 naxatw-h-16 naxatw-flex naxatw-items-center naxatw-justify-center naxatw-relative">
              <span className="naxatw-bg-[#FF0F0F] naxatw-rounded-full naxatw-w-6 naxatw-h-6 naxatw-text-white naxatw-text-lg naxatw-font-bold naxatw-absolute naxatw-top-0 naxatw-right-0 naxatw-flex naxatw-items-center naxatw-justify-center">
                3
              </span>
              <img
                className="naxatw-mt-2 naxatw-ml-2 naxatw-h-8"
                src={NotificationIcon}
                alt="avatar-placeholder"
              />
            </figure>

            <figure className="naxatw-bg-primary-50 naxatw-border naxatw-border-grey-300 naxatw-rounded-full naxatw-w-16 naxatw-h-16 naxatw-flex naxatw-items-center naxatw-justify-center">
              <img src={AvatarIcon} alt="avatar-placeholder" />
            </figure>
          </div>
        </div>
      </div>
    </header>
  );
}
