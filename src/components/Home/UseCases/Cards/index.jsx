/* eslint-disable react/prop-types */
import CommonBtn from '@Components/common/CommButton/index';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCaseCard({ ele, catid }) {
  return (
    <Flex
      className={`${
        ele.id % 2 === 0 ? 'naxatw-flex-row-reverse' : ''
      } naxatw-bg-white naxatw-max-h-[360px]`}
    >
      <img src={ele.img} alt={ele.title} width={519} />

      <FlexColumn className="naxatw-py-10 naxatw-pr-5 naxatw-pl-[57px] naxatw-gap-5">
        <p className=" naxatw-text-[12px] naxatw-text-[#347769]">
          {ele.heading.toUpperCase()}
        </p>
        <h2 className=" naxatw-text-xl naxatw-leading-[26px]">{ele.title}</h2>
        <p className=" naxatw-text-base naxatw-pr-12 naxatw-leading-[22px]">
          {ele.description}
        </p>
        <CommonBtn
          className=" naxatw-w-fit naxatw-border-[1px] naxatw-text-[#FF5A5F]"
          to={`/use-cases/${catid}/${ele.id}`}
        >
          Read More
        </CommonBtn>
      </FlexColumn>
    </Flex>
  );
}
