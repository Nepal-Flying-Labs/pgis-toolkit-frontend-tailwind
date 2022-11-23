import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useOutsideClick from '@Hooks/useOutsideClick';
import { Creators as AuthCreators } from '@Actions/authentication';
import { Creators as OrganizationsCreators } from '@Actions/organizations';
import LoginLogo from '@Assets/images/logo.png';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import NotificationIcon from '@Assets/images/icons/notification-icon.svg';

const { logoutRequest } = AuthCreators;
const { toggleModal } = OrganizationsCreators;

export default function Header() {
  const dispatch = useDispatch();
  const [ref, toggle, handleToggle] = useOutsideClick();

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
          <figure className="naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center naxatw-relative">
            <span className="naxatw-bg-[#FF0F0F] naxatw-rounded-full naxatw-w-[0.875rem] naxatw-h-[0.875rem] naxatw-text-white naxatw-text-xs naxatw-font-bold naxatw-absolute naxatw-top-0 naxatw-right-0 naxatw-flex naxatw-items-center naxatw-justify-center">
              3
            </span>
            <img
              className="naxatw-h-6"
              src={NotificationIcon}
              alt="avatar-placeholder"
            />
          </figure>
          <div className="naxatw-relative" ref={ref}>
            <div onClick={() => handleToggle(!toggle)}>
              <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-cursor-pointer naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
                <img src={AvatarIcon} alt="avatar-placeholder" />
              </figure>
            </div>

            {toggle && (
              <div className="naxatw-h-[14.625rem] naxatw-w-[22.5rem] naxatw-bg-white  naxatw-absolute naxatw-right-0 naxatw-top-12 naxatw-rounded-lg naxatw-shadow-3xl naxatw-divide-y-2">
                <div className="naxatw-h-[7.625rem] naxatw-w-full  naxatw-mt-2 naxatw-p-3">
                  <div className="naxatw-h-[2.875rem] naxatw-flex naxatw-mb-3 naxatw-gap-x-3 naxatw-items-center">
                    <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
                      <img src={AvatarIcon} alt="avatar-placeholder" />
                    </figure>
                    <div>
                      <p className="naxatw-text-[0.938rem] naxatw-font-bold naxatw-leading-[1.375rem]">
                        San Shree
                      </p>
                      <span className="naxatw-text-body-md">Super Admin</span>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      dispatch(toggleModal('access-to-functionalities'))
                    }
                    className="naxatw-h-[2.5rem] naxatw-flex naxatw-items-center naxatw-cursor-pointer naxatw-gap-x-3 hover:naxatw-bg-gray-100"
                  >
                    <span className="material-icons naxatw-text-[#00A699] naxatw-ml-[1.375rem] ">
                      info
                    </span>
                    <a className="naxatw-text-[0.938rem] naxatw-text-[#00A699] naxatw-font-bold naxatw-leading-6">
                      Your access to functionality
                    </a>
                    <span className="material-icons naxatw-text-[#00A699]">
                      chevron_right
                    </span>
                  </div>
                </div>
                <ul className="">
                  <li className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 hover:naxatw-bg-gray-100 naxatw-cursor-pointer">
                    <span className="material-icons naxatw-text-[#484848]">
                      settings
                    </span>

                    <span className="naxatw-text-body-lg">
                      Account Settings
                    </span>
                  </li>

                  <li
                    role="presentation"
                    onClick={() => dispatch(logoutRequest())}
                    className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 hover:naxatw-bg-gray-100 naxatw-cursor-pointer"
                  >
                    <span className="material-icons naxatw-text-[#FF0F0F]">
                      logout
                    </span>

                    <span className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">
                      Sign Out
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
