import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function About() {
  return (
    <FlexColumn className="naxatw-items-center naxatw-justify-center">
      <p className="naxatw-text-[#FF5A5F] naxatw-leading-5 naxatw-text-base naxatw-font-bold">
        ABOUT USAFIRI
      </p>
      <p className=" naxatw-text-[#212121] naxatw-mt-10 naxatw-text-center naxatw-leading-[42px] naxatw-text-[24px] naxatw-font-normal naxatw-tracking-tight">
        An open-source, web gis based participatory tool that
        <br />
        <span className="naxatw-text-[#212121] naxatw-text-center naxatw-leading-[28px] naxatw-text-[20px] naxatw-font-bold naxatw-tracking-tight">
          Adapts
        </span>{' '}
        existing mapping tools{' '}
        <span className="naxatw-text-[#212121] naxatw-text-center naxatw-leading-[28px] naxatw-text-[20px] naxatw-font-bold naxatw-tracking-tight">
          Assembles
        </span>{' '}
        existing data from multiple sources <br />
        <span className="naxatw-text-[#212121] naxatw-text-center naxatw-leading-[28px] naxatw-text-[20px] naxatw-font-bold naxatw-tracking-tight">
          Validates
        </span>{' '}
        &{' '}
        <span className="naxatw-text-[#212121] naxatw-text-center naxatw-leading-[28px] naxatw-text-[20px] naxatw-font-bold naxatw-tracking-tight">
          Enhances
        </span>{' '}
        data through community participation.
        <p className=" naxatw-text-[18px]">
          The tool is co-designed with practitioners in the field of
          transportation need
          <br /> assessments, climate technology and geospatial applications
          design and development.
          <br /> The tool addresses the need for combining datasets from
          multiple sources via a web
          <br /> browser and allows basic levels of analysis to aid transport
          decision making.
        </p>{' '}
      </p>
    </FlexColumn>
  );
}
