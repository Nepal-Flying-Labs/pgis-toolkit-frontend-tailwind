import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function About() {
  return (
    <FlexColumn className="naxatw-items-center naxatw-justify-center">
      <p className="naxatw-text-[#FF5A5F] naxatw-leading-5 naxatw-text-base naxatw-font-bold">
        ABOUT USAFIRI
      </p>
      <p className=" naxatw-text-[#212121] naxatw-mt-10 naxatw-text-center naxatw-leading-[42px] naxatw-text-[28px] naxatw-font-normal naxatw-tracking-tight">
        An open-source, web gis based participatory tool that
        <br />
        <span className="naxatw-text-[#212121] naxatw-text-center naxatw-leading-[42px] naxatw-text-[28px] naxatw-font-bold naxatw-tracking-tight">
          Adapts existing mapping tools Assembles existing data from multiple
          sources Validates & enhances data through community participation.
          <br />
        </span>{' '}
        The tool is co-designed with practitioners in the field of
        transportation need assessments, climate technology and geospatial
        applications design and development. The tool addresses the need for
        combining datasets from multiple sources via a web browser and allows
        basic levels of analysis to aid transport decision making.{' '}
      </p>
    </FlexColumn>
  );
}
