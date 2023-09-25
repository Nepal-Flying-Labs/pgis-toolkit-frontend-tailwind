import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useEffect, useState } from 'react';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import Flex from '@Components/common/Layout/Flex/index';
import UseCaseBigCard from './cards/index';
import { useCases } from '../../Home/UseCases/Data/data';

export default function SingleUseCaseSection({id}) {
  const [usecase, setUseCase] = useState({});
  useEffect(() => {
    if (id) {
      setUseCase(
        useCases.filter(ele => ele.id.toString() === id.toString())[0],
      );
    }
  }, [id]);
 
  return (
    <FlexColumn className="naxatw-w-full">
        <Flex className=' naxatw-w-full naxatw-bg-[#EFEFEF] naxatw-px-[155px] naxatw-py-[85px]'>
        <UseCaseBigCard usecase={usecase} />
        </Flex>
      <FlexBetween className=" naxatw-pt-[60px] naxatw-px-[155px] naxatw-pb-10 naxatw-gap-[137px]">
        <FlexColumn className=" naxatw-gap-12">
            <Flex className=" naxatw-gap-6">
                <p className='naxatw-border-b-[1px] naxatw-border-b-primary-600'>Description</p>
                <p>Title 1</p>
                <p>Title 2</p>
            </Flex>
            <p>{usecase.desc}</p>
            <FlexColumn className=" naxatw-gap-4">
                <p className=' naxatw-text-[17px]'>Project Objectives</p>
               {
                usecase?.objectives && usecase?.objectives?.map((ele,key)=>
                <Flex className=" naxatw-text-[#212121] naxatw-text-[15px]">{key+1}{'. '}{ele}</Flex>
                )
               }
            </FlexColumn>
        </FlexColumn>
        <FlexColumn>
            <Flex className=" naxatw-gap-4 naxatw-border-b-[1px] naxatw-pb-3">
                <p>Title</p>
                <p>{usecase.desc}</p>
            </Flex>
            <Flex className=" naxatw-gap-4 naxatw-border-b-[1px] naxatw-pb-3">
                <p>Title</p>
                <p>{usecase.desc}</p>
            </Flex>
        </FlexColumn>
      </FlexBetween>
   </FlexColumn>
    );
}
