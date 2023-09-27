/* eslint-disable prettier/prettier */
import { useCases } from '@Components/Home/UseCases/Data/data';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useState } from 'react';
import UseCaseCard from './Card/index';

export default function UseCaseMain() {
  const [caseCard, setCaseCard] = useState(
    useCases.filter(ele => ele.id === '1'),
  );

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
          {useCases.map(ele => (
            <div
              className={`${
                ele.id === caseCard[0].id
                  ? 'naxatw-border-b-[2px] naxatw-border-[#FF5A5F]'
                  : ''
              } naxatw-cursor-pointer`}
              onClick={() => setCaseCard([ele])}
              key={ele.id}
            >
              {ele.heading}
            </div>
          ))}
        </Flex>
      </FlexColumn>
      <div className=" naxatw-grid naxatw-grid-cols-3 naxatw-gap-5 naxatw-px-[155px] naxatw-py-12 naxatw-bg-[#F5F5F5]">
        {caseCard[0].content ? (
          caseCard[0].content?.map(ele => (
            <UseCaseCard ele={ele} id={caseCard[0].id} key={ele.id} />
          ))
        ) : (
          <p>Sorry!, we dont have data of this segment.</p>
        )}
      </div>
    </FlexColumn>
  );
}
