/* eslint-disable react/prop-types */
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function FeatureCard({ ele }) {
  return (
    <FlexColumn className="naxatw-justify-start naxatw-items-center ">
      <div className=" naxatw-w-full">
        <img src={ele.image} alt={ele.title} />
      </div>

      <h1 className="naxatw-text-xl naxatw-pt-6 naxatw-pb-4 naxatw-text-[#212121]">
        {ele.title}
      </h1>
      <p className="naxatw-text-start naxatw-text-[background: #484848]">
        {ele.desc}
      </p>
    </FlexColumn>
  );
}
