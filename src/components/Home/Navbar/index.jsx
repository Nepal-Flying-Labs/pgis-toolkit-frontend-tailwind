import React, { useEffect } from 'react';
import LOGO from '@Assets/images/logo.svg';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import Links from '@Components/common/Link/index';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/authentication';
import { Creators as CommonCreators } from '@Actions/common';
import getImageSource from '@Utils/getImageSource';
import { useHistory } from 'react-router-dom';
import useOutsideClick from '@Hooks/useOutsideClick';
import AvatarIcon from '@Assets/images/user-avatar.png';

const { logoutRequest, getUserProfileRequest } = Creators;
const { toggleModal } = CommonCreators;

function NavSection() {
  const userProfile = useSelector(state => state.authentication.userProfile);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [ref, toggle, handleToggle] = useOutsideClick();
  console.log(toggle);
  useEffect(() => {
    if (!localStorage.getItem('userToken')) return;
    dispatch(getUserProfileRequest());
  }, [dispatch]);

  return (
    <nav className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-w-full naxatw-bg-[#FF5A5F] naxatw-py-4 naxatw-px-[156px]">
      <FlexBetween className="naxatw-w-full">
        <Links to="/">
          <img
            src={LOGO}
            alt="logo"
            className="naxatw-w-[153px] naxatw-h-[45px]"
          />
        </Links>
        <FlexBetween className="naxatw-gap-3 naxatw-items-center">
          <Links
            className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2"
            to="/use-cases/"
          >
            USE CASES
          </Links>
          <Links
            className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2"
            onClick={async () => {
              if (window.location.pathname !== '/') {
                await navigate.push('/');
              }
              document
                .getElementById('about-section')
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ABOUT
          </Links>

          {userProfile?.image ? (
            <>
              <Links
                className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2"
                to="/organizations"
              >
                MY ORGANIZATIONS
              </Links>
              <div onClick={() => handleToggle(!toggle)} ref={ref}>
                <img
                  src={getImageSource(userProfile.image)}
                  alt="profile"
                  className=" naxatw-object-fill naxatw-w-10 naxatw-h-10 naxatw-rounded-full naxatw-cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              <Links
                className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2"
                onClick={async () => {
                  if (window.location.pathname !== '/') {
                    await navigate.push('/');
                  }
                  document
                    .getElementById('request-form')
                    .scrollIntoView({ behavior: 'smooth' });
                }}
              >
                REQUEST ACCESS
              </Links>
              <Links
                className="naxatw-text-white naxatw-border-[1px] naxatw-px-5 naxatw-py-2 naxatw-rounded-lg hover:naxatw-bg-white hover:naxatw-text-red-500"
                to="/login"
              >
                SIGN IN
              </Links>
            </>
          )}
        </FlexBetween>
      </FlexBetween>
      {toggle && (
        <div className="naxatw-h-[12.85rem] naxatw-w-[22.5rem] naxatw-bg-white  naxatw-absolute naxatw-right-[160px] naxatw-top-[75px] naxatw-rounded-lg naxatw-shadow-light naxatw-divide-y-2">
          <div className="naxatw-h-[6.925rem] naxatw-w-full  naxatw-mt-2 naxatw-p-3">
            <div className="naxatw-h-[2.875rem] naxatw-flex naxatw-mb-2 naxatw-gap-x-3 naxatw-items-center">
              <figure className="naxatw-bg-primary-50 naxatw-relative naxatw-border naxatw-border-grey-300 naxatw-rounded-full naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center">
                <img
                  src={
                    userProfile.image
                      ? getImageSource(userProfile.image)
                      : AvatarIcon
                  }
                  alt="avatar-placeholder"
                  className="naxatw-rounded-full naxatw-w-[40px] naxatw-h-[40px] naxatw-object-cover"
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
            <li
              role="presentation"
              onClick={() => dispatch(toggleModal('account-settings'))}
              className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 naxatw-h-10 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
            >
              <span className="material-icons naxatw-text-[#484848]">
                settings
              </span>

              <span className="naxatw-text-body-lg">Account Settings</span>
            </li>

            <li
              role="presentation"
              onClick={() => dispatch(logoutRequest())}
              className="naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-p-3 naxatw-h-10 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
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
    </nav>
  );
}

export default NavSection;
