import CommonBtn from '@Components/common/CommButton/index';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useState } from 'react';
import { useCases } from './Data/data';
import UseCaseCard from './Cards/index';

export default function UseCaseSection() {
  const [cardData, setCardData] = useState(
    useCases.filter(ele => ele.id === '1'),
  );
  console.log(cardData[0].content);
  return (
    <FlexColumn className="naxatw-gap-3 naxatw-items-center naxatw-justify-center">
      <h1 className="naxatw-text-[34px] naxatw-text-[#212121]">Use cases</h1>
      <p className=" naxatw-text-base naxatw-w-[494px]">
        A GIS-based toolkit ti assest, in a participatory way, the unmet
        transportation needs & mobility barriers of rural communities.
      </p>
      <FlexColumn className="naxatw-items-center naxatw-justify-center">
        <FlexBetween className="naxatw-gap-5 naxatw-mt-8">
          {useCases.map(ele => (
            <CommonBtn
              className={`${
                ele.id === cardData[0].id
                  ? 'naxatw-text-white naxatw-bg-[#FF5A5F]'
                  : 'naxatw-border-[1px] naxatw-text-[#FF5A5F]'
              }`}
              onClick={() => setCardData([ele])}
            >
              {ele.heading}
            </CommonBtn>
          ))}
        </FlexBetween>
      </FlexColumn>
      <FlexColumn className="naxatw-gap-10 naxatw-mt-12">
        {cardData[0]?.content ? (
          cardData[0]?.content?.map(ele => (
            <UseCaseCard ele={ele} catid={cardData[0].id} />
          ))
        ) : (
          <p>Sorry! we do not have data.</p>
        )}
      </FlexColumn>
    </FlexColumn>
  );
}
