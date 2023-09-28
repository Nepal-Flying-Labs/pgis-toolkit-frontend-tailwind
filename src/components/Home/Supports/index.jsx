import CommonBtn from '@Components/common/CommButton/index';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useState } from 'react';
import { supportsdata } from './data/data';

export default function SupportSection() {
  const [active, setActive] = useState(
    supportsdata.filter(ele => ele.id.toString() === '1'),
  );
  const setNewTab = ele => {
    setActive([ele]);
  };
  return (
    <FlexColumn className="naxatw-gap-16">
      <FlexColumn className="naxatw-items-center naxatw-justify-center">
        <p className="naxatw-text-[34px] naxatw-text-[#FF5A5F]">uSAFIRI</p>
        <p className="naxatw-text-[34px]">supports various Spatial Analysis</p>
        <FlexBetween className="naxatw-gap-5 naxatw-mt-8">
          {supportsdata.map(ele => (
            <CommonBtn
              className={` ${
                active[0].id.toString() === ele.id
                  ? 'naxatw-text-white naxatw-bg-[#FF5A5F]'
                  : 'naxatw-border-[#FF5A5F] naxatw-border-[1px] naxatw-text-[#FF5A5F]'
              } `}
              key={ele.id}
              onClick={() => setNewTab(ele)}
            >
              {ele.title}
            </CommonBtn>
          ))}
        </FlexBetween>
      </FlexColumn>
      <div className="naxatw-grid naxatw-grid-cols-2 naxatw-gap-[100px] naxatw-items-center">
        <img src={active[0].image} alt="datarequirement" />
        <FlexColumn className="naxatw-gap-6 naxatw-justify-start naxatw--mt-6">
          <h2 className=" naxatw-text-xl">{active[0].title}</h2>
          <p className="naxatw-text-base">{active[0].content}</p>
        </FlexColumn>
      </div>
    </FlexColumn>
  );
}
