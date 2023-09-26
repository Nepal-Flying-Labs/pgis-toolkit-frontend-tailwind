import Links from '@Components/common/Link/index';
import BannerLogo from '@Assets/images/BannerLogo.png';
import React from 'react';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';

export default function HomeBanner() {
  return (
    <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-[95px] naxatw-items-center naxatw-my-[84px]">
      <FlexColumn>
        <p className="naxatw-text-[38px] naxatw-font-[400] naxatw-text-white naxatw-leading-[44px]">
          Transitioning from Paper- Based Community Mapping to Digital
          Participation
        </p>
        <p className=" naxatw-text-white naxatw-mt-6">
          Store, Map and Analyse mobility related spatial datasets with
          communities
        </p>
        <Links className="naxatw-flex naxatw-w-fit naxatw-text-sm naxatw-text-white naxatw-border-[1px] naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-mt-6 naxatw-font-[700] hover:naxatw-bg-white hover:naxatw-text-red-500">
          LEARN MORE
        </Links>
      </FlexColumn>
      <img src={BannerLogo} alt="banner" className=" naxatw-w-[584px]" />
    </div>
  );
}
