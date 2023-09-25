/* eslint-disable prettier/prettier */
import { useCases } from '@Components/Home/UseCases/Data/data';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import UseCaseCard from './Card/index';

export default function UseCaseMain() {
  return (
    <FlexColumn>
      <FlexColumn className=" naxatw-gap-15 naxatw-px-[155px] naxatw-pt-14 naxatw-bg-[#EFEFEF]">
        <FlexColumn className=" naxatw-w-[494px] naxatw-gap-5">
          <p className=" naxatw-text-[#212121] naxatw-text-4xl">
            Discover{' '}
            <span className="naxatw-text-[#FF5A5F] naxatw-text-4xl">
              Use Cases
            </span>
          </p>
          <p className=" naxatw-text-[#212121] naxatw-text-base">
            A GIS-based toolkit ti assest, in a participatory way, the unmet
            transportation needs & mobility barriers of rural communities.
          </p>
        </FlexColumn>
        <Flex className=" naxatw-mt-[107px] naxatw-gap-6">
          <p className=" naxatw-border-b-[2px] naxatw-border-[#FF5A5F]">
            Transport Assessment
          </p>
          <p>Participatory risk Mapping</p>
          <p>Other thermic Area</p>
        </Flex>
      </FlexColumn>
      <div className=" naxatw-grid naxatw-grid-cols-3 naxatw-gap-5 naxatw-px-[155px] naxatw-py-12 naxatw-bg-[#F5F5F5]">
        {useCases.map(ele => (
          <UseCaseCard ele={ele} />
        ))}
      </div>
    </FlexColumn>
  );
}
