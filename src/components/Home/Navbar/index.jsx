import React from 'react';
import LOGO from '@Assets/images/LogoNew.png';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import Links from '@Components/common/Link/index';

function NavSection() {
  return (
    <nav className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-w-full naxatw-bg-[#FF5A5F] naxatw-py-4 naxatw-px-[156px]">
      <FlexBetween className="naxatw-w-full">
        <Links to="/landing">
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
          <Links className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2">
            ABOUT
          </Links>
          <Links className="naxatw-font-bold naxatw-text-[14px] naxatw-text-white naxatw-px-3 naxatw-py-2">
            REQUEST ACCESS
          </Links>
          <Links className="naxatw-text-white naxatw-border-[1px] naxatw-px-5 naxatw-py-2 naxatw-rounded-lg hover:naxatw-bg-white hover:naxatw-text-red-500">
            SIGN IN
          </Links>
        </FlexBetween>
      </FlexBetween>
    </nav>
  );
}

export default NavSection;
