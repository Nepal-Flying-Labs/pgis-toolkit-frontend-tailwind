/* eslint-disable react/prop-types */
import CommonBtn from '@Components/common/CommButton/index';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCaseCard({ ele, id }) {
  return (
    <FlexColumn className=" naxatw-bg-[#FFFFFF] naxatw-rounded-xl naxatw-h-fit">
      <img src={ele.img} alt={ele.heading} className="naxatw-rounded-t-xl" />
      <FlexColumn className=" naxatw-px-6 naxatw-py-8 naxatw-gap-4">
        <p className=" naxatw-text-[#347769] naxatw-font-bold naxatw-text-xs">
          {ele.heading}
        </p>
        <p className=" naxatw-text-xl naxatw-text-[#212121]">{ele.title}</p>
        <p className=" naxatw-text-[#484848] naxatw-text-xs naxatw-leading-5">
          {ele.description}
        </p>
      </FlexColumn>
      <Flex className=" naxatw-w-full naxatw-px-6 naxatw-pb-8">
        <CommonBtn
          className="naxatw-w-full naxatw-text-[#FF5A5F] naxatw-border-[#FF5A5F] naxatw-border-[1px] naxatw-items-center naxatw-justify-center"
          to={`/use-cases/${id}/${ele.id}`}
        >
          {' '}
          Read More
        </CommonBtn>
      </Flex>
    </FlexColumn>
  );
}
