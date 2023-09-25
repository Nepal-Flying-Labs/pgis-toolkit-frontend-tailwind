/* eslint-disable react/prop-types */
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCaseBigCard({ usecase }) {
  return (
    <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-5">
      <FlexColumn>
        <FlexColumn className=" naxatw-gap-3">
          <p className=" naxatw-text-xs naxatw-text-[#347769]">
            {usecase.toptitle}
          </p>
          <h1 className=" naxatw-text-[#212121] naxatw-text-2xl">
            {usecase.title}
          </h1>
        </FlexColumn>
        <FlexColumn className=" naxatw-mt-8">
          <p>kenya</p>
          <p>time</p>
        </FlexColumn>
      </FlexColumn>
      <img
        src={usecase.img}
        alt={usecase.title}
        className=" naxatw-rounded-[20px] naxatw-max-h-[280px]"
      />
    </div>
  );
}
