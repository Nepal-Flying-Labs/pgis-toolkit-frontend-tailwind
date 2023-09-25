import TopNav from '@Components/Home/Navbar/TopNav/index';
import NavSection from '@Components/Home/Navbar/index';
import UseCaseMain from '@Components/UseCases/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';

export default function UseCasesPage() {
  return (
    <FlexColumn>
      <TopNav />
      <NavSection />
      <UseCaseMain />
    </FlexColumn>
  );
}
