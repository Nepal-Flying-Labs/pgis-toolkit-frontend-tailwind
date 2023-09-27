/* eslint-disable react/prop-types */
import CommonBtn from '@Components/common/CommButton/index';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import systemRequirementDocument from '@Assets/files/System-Requirement-Document.pdf';
import { saveAs } from 'file-saver';
import React from 'react';

export default function RequirementsCard({ ele }) {
  return (
    <FlexColumn className="naxatw-bg-[#FFFFFF] naxatw-p-10 naxatw-gap-10 naxatw-rounded-md">
      <img
        src={ele.img}
        alt={ele.title}
        className="naxatw-h-[60px] naxatw-w-[60px]"
      />
      <h3>{ele.title}</h3>
      <p className=" naxatw-text-base">{ele.desc}</p>
      <Flex className="naxatw-gap-2">
        <a
          href={systemRequirementDocument}
          className="naxatw-flex naxatw-text-sm naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-border-[#FF5A5F] hover:naxatw-bg-[#edb4b6] naxatw-text-[#FF5A5F] naxatw-border-[1px]"
        >
          Read Document
        </a>
        <CommonBtn
          onClick={() => {
            saveAs(systemRequirementDocument, 'SystemRequirementDocument.pdf');
          }}
          className="naxatw-text-[#FF5A5F]"
        >
          Download
        </CommonBtn>
      </Flex>
    </FlexColumn>
  );
}
