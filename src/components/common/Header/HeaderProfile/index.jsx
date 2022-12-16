import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthCreators } from '@Actions/authentication';
import { Creators as OrganizationsCreators } from '@Actions/organizations';
import useOutsideClick from '@Hooks/useOutsideClick';
import AvatarIcon from '@Assets/images/user-avatar.png';

const { logoutRequest, getUserProfileRequest } = AuthCreators;
const { toggleModal } = OrganizationsCreators;

export default function HeaderProfile() {
  const userProfile = useSelector(state => state.authentication.userProfile);
  const [ref, toggle, handleToggle] = useOutsideClick();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileRequest());
  }, [dispatch]);

  return (
    <div className="naxatw-relative" ref={ref}>
      <div onClick={() => handleToggle(!toggle)}>
        <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-cursor-pointer naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
          <img
            src={userProfile.image || AvatarIcon}
            alt="avatar-placeholder"
            className="naxatw-rounded-full"
          />
        </figure>
      </div>

      {toggle && (
        <div className="naxatw-h-[14.625rem] naxatw-w-[22.5rem] naxatw-bg-white  naxatw-absolute naxatw-right-0 naxatw-top-12 naxatw-rounded-lg naxatw-shadow-3xl naxatw-divide-y-2">
          <div className="naxatw-h-[7.625rem] naxatw-w-full  naxatw-mt-2 naxatw-p-3">
            <div className="naxatw-h-[2.875rem] naxatw-flex naxatw-mb-3 naxatw-gap-x-3 naxatw-items-center">
              <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
                <img
                  src={userProfile.image || AvatarIcon}
                  alt="avatar-placeholder"
                  className="naxatw-rounded-full"
                />
              </figure>
              <div>
                <p className="naxatw-text-[0.938rem] naxatw-font-bold naxatw-leading-[1.375rem]">
                  {userProfile.full_name || 'Username'}
                </p>
                <span className="naxatw-text-body-md">
                  {userProfile.role || 'User Role'}
                </span>
              </div>
            </div>
            <div
              onClick={() => dispatch(toggleModal('access-to-functionalities'))}
              className="naxatw-h-[2.5rem] naxatw-flex naxatw-items-center naxatw-cursor-pointer naxatw-gap-x-3 hover:naxatw-bg-grey-100 naxatw-group"
            >
              <span className="material-icons naxatw-text-[#00A699] naxatw-ml-[1.375rem] ">
                info_outline
              </span>
              <a className="naxatw-text-[0.938rem] naxatw-text-[#00A699] naxatw-font-bold naxatw-leading-6 group-hover:naxatw-underline">
                Your access to functionality
              </a>
              <span className="material-icons naxatw-text-[#00A699]">
                chevron_right
              </span>
            </div>
          </div>
          <ul className="">
            <li className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 hover:naxatw-bg-grey-100 naxatw-cursor-pointer">
              <span className="material-icons naxatw-text-[#484848]">
                settings
              </span>

              <span className="naxatw-text-body-lg">Account Settings</span>
            </li>

            <li
              role="presentation"
              onClick={() => dispatch(logoutRequest())}
              className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
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
  );
}
