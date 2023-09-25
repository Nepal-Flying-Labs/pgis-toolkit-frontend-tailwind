import Links from '@Components/common/Link/index';
import BannerLogo from '@Assets/images/BannerLogo.png';
import React from 'react';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';

export default function HomeBanner() {
  return (
    <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-[95px] naxatw-items-center naxatw-my-[84px]">
      <FlexColumn>
        <p className="naxatw-text-[36px] naxatw-font-[400] naxatw-text-white">
          Transitioning from Paper-Based Community Mapping to Digital
          Participation
        </p>
        <Links className="naxatw-flex naxatw-w-fit naxatw-text-sm naxatw-text-white naxatw-border-[1px] naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-mt-6 naxatw-font-[700] hover:naxatw-bg-white hover:naxatw-text-red-500">
          LEARN MORE
        </Links>
      </FlexColumn>
      <img src={BannerLogo} alt="banner" />
    </div>
  );
}
