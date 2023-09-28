/* eslint-disable prettier/prettier */
import React from 'react';
import FooterLogo from '@Assets/images/home/footer/FooterLogo.svg';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import Flex from '@Components/common/Layout/Flex/index';
import facebook from '@Assets/images/home/footer/facebook.svg';
import twitter from '@Assets/images/home/footer/twitter.svg';
import link from '@Assets/images/home/footer/link.svg';
import youtube from '@Assets/images/home/footer/youtube.svg';

export default function FooterSection() {
  return (
    <FlexBetween className=" naxatw-items-end">
      <FlexColumn className="naxatw-gap-[26px]">
        <img src={FooterLogo} alt="footerlogo" width={157} />
        <FlexBetween className=" naxatw-gap-[26px] naxatw-text-xs">
          <p>© 2022 uSAFIRI</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </FlexBetween>
      </FlexColumn>
      <Flex className=" naxatw-gap-5">
        <img src={facebook} alt="facebook" />
        <img src={twitter} alt="twitter" />
        <img src={link} alt="linkedin" />
        <img src={youtube} alt="youtube" />
      </Flex>
      <FlexColumn>
        <Flex className=" naxatw-justify-end naxatw-gap-3 ">
          <p className="naxatw-text-[#212121] naxatw-font-bold">Use Case</p>
          <p className="naxatw-text-[#212121] naxatw-font-bold">About</p>
        </Flex>
        <FlexBetween className=" naxatw-gap-2">
          <p>Designed & Developed by </p>
          <p className="naxatw-text-[#212121] naxatw-font-bold">NAXA</p>
        </FlexBetween>
      </FlexColumn>
    </FlexBetween>
  );
}
