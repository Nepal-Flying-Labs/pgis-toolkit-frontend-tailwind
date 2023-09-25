import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import FaqPic from '@Assets/images/BannerLogo.png';
import { faqs } from './data/data';
import FaqAccordion from './Accordion/index';

export default function FaqSection() {
  return (
    <div className=" naxatw-grid naxatw-grid-cols-2 naxatw-gap-[120px] naxatw-items-center naxatw-justify-center naxatw-w-full">
      <FlexColumn className="naxatw-leading-10 naxatw-gap-10">
        <h1 className=" naxatw-text-[#212121] naxatw-text-[34px] naxatw-font-bold">
          FAQs
        </h1>
        <FlexColumn className="naxatw-gap-4">
          {faqs.map(ele => (
            <FaqAccordion collapsed header={ele.title} body={ele.desc} />
          ))}
        </FlexColumn>
      </FlexColumn>
      <img src={FaqPic} alt="faq" className="naxatw-object-fill" />
    </div>
  );
}
