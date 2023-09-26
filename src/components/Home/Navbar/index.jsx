import React, { useEffect } from 'react';
import LOGO from '@Assets/images/logo.svg';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import Links from '@Components/common/Link/index';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/authentication';
import getImageSource from '@Utils/getImageSource';
import { useHistory } from 'react-router-dom';

const { getUserProfileRequest } = Creators;

function NavSection() {
  const userProfile = useSelector(state => state.authentication.userProfile);
  const dispatch = useDispatch();
  const navigate = useHistory();

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
            className="naxatw-w-[128px] naxatw-h-[24px]"
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
                My ORGANIZATIONS
              </Links>
              <img
                src={getImageSource(userProfile.image)}
                alt="profile"
                className=" naxatw-object-fill naxatw-w-10 naxatw-h-10 naxatw-rounded-full naxatw-cursor-pointer"
              />
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
    </nav>
  );
}

export default NavSection;
