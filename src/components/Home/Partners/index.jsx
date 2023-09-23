import FlexBetween from '@Components/common/Layout/FlexBetween/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React from 'react';
import partner1 from '@Assets/images/home/partners/partner1.png';
import partner2 from '@Assets/images/home/partners/partner2.png';
import partner3 from '@Assets/images/home/partners/patner3.png';
import partner4 from '@Assets/images/home/partners/partner4.png';

export default function PartnerSection() {
  return (
    <FlexColumn>
      <h1>Partners</h1>
      <FlexBetween>
        <img src={partner1} alt="patner1" width={340} />
        <img src={partner2} alt="patner2" />
        <img src={partner3} alt="patner3" />
        <img src={partner4} alt="patner4" />
      </FlexBetween>
    </FlexColumn>
  );
}
