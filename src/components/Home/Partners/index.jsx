import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import partner1 from '@Assets/images/home/partners/partner1.svg';
import partner2 from '@Assets/images/home/partners/partner2.svg';
import partner3 from '@Assets/images/home/partners/partner3.svg';
import partner4 from '@Assets/images/home/partners/partner4.svg';

export default function PartnerSection() {
  return (
    <FlexColumn className="naxatw-w-full naxatw-items-center naxatw-justify-center naxatw-gap-10">
      <h1 className="naxatw-text-[34px] naxatw-text-[#212121]">Partners</h1>
      <FlexBetween className=" naxatw-w-full naxatw-items-start naxatw-px-16">
        <img src={partner1} alt="patner1" className="naxatw-object-fill" />
        <img src={partner2} alt="patner2" className="naxatw-object-fill" />
        <img src={partner3} alt="patner3" className="naxatw-object-fill" />
        <img src={partner4} alt="patner4" className="naxatw-object-fill" />
      </FlexBetween>
    </FlexColumn>
  );
}
