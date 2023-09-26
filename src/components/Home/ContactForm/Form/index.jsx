import CommonBtn from '@Components/common/CommButton/index';
import Input from '@Components/common/Input/index';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import TextArea from '@Components/common/TextArea/index';
import React from 'react';

export default function ContactForm() {
  return (
    <FlexColumn className="naxatw-gap-6">
      <Flex className=" naxatw-gap-[30px]">
        <Input
          label="NAME"
          placeholder="Enter your Name"
          name="name"
          required
        />
        <Input
          label="EMAIL"
          placeholder="Enter your Email"
          name="name"
          required
        />
      </Flex>
      <Flex className=" naxatw-gap-[30px]">
        <Input
          label="PHONE"
          placeholder="Enter your Phone"
          name="name"
          required
        />
        <Input
          label="ORGANIZATION"
          placeholder="Enter your Organization"
          name="name"
          required
        />
      </Flex>
      <TextArea placeholder="Describe to us how you would use Usafiri" />
      <CommonBtn className=" naxatw-w-fit naxatw-text-white naxatw-bg-[#FF5A5F] hover:naxatw-bg-[#e05257] hover:naxatw-underline">
        {' '}
        Send Message{' '}
      </CommonBtn>
      <p className=" naxatw-text-[17px] naxatw-text-[#484848]">
        Or for general queries directly mail us at{' '}
        <span className="naxatw-text-[#FF5A5F]">hello@usafiri.io</span>
      </p>
    </FlexColumn>
  );
}
