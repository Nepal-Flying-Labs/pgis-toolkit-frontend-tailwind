import NavSection from '@Components/Home/Navbar/index';
import SingleUseCaseSection from '@Components/UseCases/SinglePage/index';
import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCases() {
  const id = window.location.pathname.split('/')[2];
  return (
    <FlexColumn>
      <NavSection />
      <Flex className="naxatw-w-full">
        <SingleUseCaseSection id={id} />
      </Flex>
    </FlexColumn>
  );
}
