import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import { datarequirements } from './data/data';
import RequirementsCard from './Card/index';

export default function DataUnderstanding() {
  return (
    <FlexColumn className="naxatw-gap-6">
      <h1 className="naxatw-text-[34px] naxatw-text-[#212121]">
        Understanding{' '}
        <span className="naxatw-text-[34px] naxatw-text-[#FF5A5F] ">
          Data Requirements.
        </span>
      </h1>
      <p className=" naxatw-w-[501px]">
        If you are utilizing USAFIRI for transportation needs assessment, the
        required standardized list of datasets that need to be collected
        includes:
      </p>
      <div className=" naxatw-grid naxatw-grid-cols-2 naxatw-gap-5">
        {datarequirements.map(ele => (
          <RequirementsCard key={ele.id} ele={ele} />
        ))}
      </div>
    </FlexColumn>
  );
}
