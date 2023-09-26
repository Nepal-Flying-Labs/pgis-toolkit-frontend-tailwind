import NavSection from '@Components/Home/Navbar/index';
import UseCaseMain from '@Components/UseCases/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCasesPage() {
  return (
    <FlexColumn>
      <NavSection />
      <UseCaseMain />
    </FlexColumn>
  );
}
