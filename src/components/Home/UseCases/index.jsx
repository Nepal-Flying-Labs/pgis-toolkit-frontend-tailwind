import CommonBtn from '@Components/common/CommButton/index';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import { useCases } from './Data/data';
import UseCaseCard from './Cards/index';

export default function UseCaseSection() {
  return (
    <FlexColumn className="naxatw-gap-3 naxatw-items-center naxatw-justify-center">
      <h1 className="naxatw-text-[34px] naxatw-text-[#212121]">
        Understanding cases
      </h1>
      <p className=" naxatw-text-sm naxatw-w-[494px]">
        A GIS-based toolkit ti assest, in a participatory way, the unmet
        transportation needs & mobility barriers of rural communities.
      </p>
      <FlexColumn className="naxatw-items-center naxatw-justify-center">
        <FlexBetween className="naxatw-gap-5 naxatw-mt-8">
          <CommonBtn className="naxatw-text-white naxatw-bg-[#FF5A5F]">
            Transport Assessment
          </CommonBtn>
          <CommonBtn className="naxatw-border-[1px] naxatw-text-[#FF5A5F]">
            Participatory Risk Mapping
          </CommonBtn>
          <CommonBtn className="naxatw-border-[1px] naxatw-text-[#FF5A5F]">
            Other Thematic Areas
          </CommonBtn>
        </FlexBetween>
      </FlexColumn>
      <FlexColumn className="naxatw-gap-10 naxatw-mt-12">
        {useCases.map(ele => (
          <UseCaseCard ele={ele} />
        ))}
      </FlexColumn>
    </FlexColumn>
  );
}
