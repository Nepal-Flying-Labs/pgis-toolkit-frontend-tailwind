import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import Img1 from '@Assets/images/home/contactform/Frame.png';
import ContactForm from './Form/index';

export default function ContactFormSection() {
  return (
    <Flex className="naxatw-items-center naxatw-justify-between">
      <FlexColumn className=" naxatw-gap-8">
        <FlexColumn className=" naxatw-items-start naxatw-gap-1">
          <p className=" naxatw-text-[#FF5A5F]">Request Access</p>
          <p className=" naxatw-text-[#212121] naxatw-text-[26px] naxatw-font-bold">
            Get in touch with us.
          </p>
        </FlexColumn>
        <ContactForm />
      </FlexColumn>
      <img src={Img1} alt="form" />
    </Flex>
  );
}
