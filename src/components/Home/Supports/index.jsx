import CommonBtn from '@Components/common/CommButton/index';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import datreq from '@Assets/images/home/supports/DataRequirement.png';

export default function SupportSection() {
  return (
    <FlexColumn className="naxatw-gap-16">
      <FlexColumn className="naxatw-items-center naxatw-justify-center">
        <p className="naxatw-text-[34px] naxatw-text-[#FF5A5F]">USAFIRI</p>
        <p className="naxatw-text-[34px]">supports various Spatial Analysis</p>
        <FlexBetween className="naxatw-gap-5 naxatw-mt-8">
          <CommonBtn className="naxatw-text-white naxatw-bg-[#FF5A5F]">
            Data Query
          </CommonBtn>
          <CommonBtn className="naxatw-border-[1px] naxatw-text-[#FF5A5F]">
            Buffer Analysis
          </CommonBtn>
          <CommonBtn className="naxatw-border-[1px] naxatw-text-[#FF5A5F]">
            Proximity Analysis
          </CommonBtn>
          <CommonBtn className="naxatw-border-[1px] naxatw-text-[#FF5A5F]">
            Optimal route Analysis
          </CommonBtn>
        </FlexBetween>
      </FlexColumn>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-[100px] naxatw-items-center">
        <img src={datreq} alt="datarequirement" />
        <FlexColumn className="naxatw-gap-6 naxatw-justify-start naxatw--mt-6">
          <h2 className=" naxatw-text-xl">Data Requirement</h2>
          <p className="naxatw-text-sm">
            USAFIRI allows for data import from multiple sources and use them
            for different mapping purpose, but it is important to review the
            Data Requirement document before beginning the data management
            process.{' '}
          </p>
        </FlexColumn>
      </div>
    </FlexColumn>
  );
}
