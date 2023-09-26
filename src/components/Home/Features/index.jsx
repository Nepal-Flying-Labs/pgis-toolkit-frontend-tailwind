import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import { majorfeatures } from './data/data';
import FeatureCard from './Card/index';

function Features() {
  return (
    <FlexColumn className="naxatw-justify-center naxatw-items-center naxatw-gap-y-12">
      <h1 className="naxatw-text-[34px] naxatw-font-bold">Major Features</h1>
      <div className="naxatw-grid naxatw-grid-cols-3 naxatw-gap-x-[112px] naxatw-gap-y-[100px]">
        {majorfeatures.map(ele => (
          <FeatureCard ele={ele} />
        ))}
      </div>
    </FlexColumn>
  );
}

export default Features;
