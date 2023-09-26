import React from 'react';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import HomeBanner from '@Components/Home/Banner/index';
import About from '@Components/Home/About/index';
import Working from '@Components/Home/Working/index';
import Features from '@Components/Home/Features/index';
import DataUnderstanding from '@Components/Home/Understanding/index';
import SupportSection from '@Components/Home/Supports/index';
import UseCaseSection from '@Components/Home/UseCases/index';
import PartnerSection from '@Components/Home/Partners/index';
import FaqSection from '@Components/Home/Faqs/index';
import ContactFormSection from '@Components/Home/ContactForm/index';
import FooterSection from '@Components/Home/Footer/index';
import NavSection from '@Components/Home/Navbar/index';

export default function Home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getLandingPageRequest({ page: 'home' }));
  // }, [dispatch]);

  return (
    <FlexColumn>
      <NavSection />
      <FlexColumn className="naxatw-w-full naxatw-bg-gradient-to-t naxatw-to-[#FF5A5F] naxatw-from-[#A41D55] naxatw-px-[156px]">
        <HomeBanner />
      </FlexColumn>
      <div className="naxatw-py-[193px] naxatw-px-[196.5px]">
        <About />
      </div>
      <div className="naxatw-bg-[#F5F5F5] naxatw-px-[96px] naxatw-pt-[107px] naxatw-pb-[76px] naxatw-w-full">
        <Working />
      </div>
      <div className="naxatw-bg-[#ffffff] naxatw-px-[271px] naxatw-py-[133px] naxatw-w-full">
        <Features />
      </div>
      <div className="naxatw-px-[155px] naxatw-py-[120px] naxatw-bg-[#F5F5F5]">
        <DataUnderstanding />
      </div>
      <div className=" naxatw-py-[110px] naxatw-px-[195px]">
        <SupportSection />
      </div>
      <div className="naxatw-py-[140px] naxatw-px-[155px] naxatw-bg-[#F5F5F5]">
        <UseCaseSection />
      </div>
      <div className="naxatw-py-[112px] naxatw-px-[40px]">
        <PartnerSection />
      </div>
      <div className="naxatw-py-[186px] naxatw-px-[155px] naxatw-bg-[#F5F5F5]">
        <FaqSection />
      </div>
      <div className="naxatw-py-[80px] naxatw-pl-[155px] naxatw-pr-[90px]">
        <ContactFormSection />
      </div>
      <div className="naxatw-py-[80px] naxatw-px-[155px] naxatw-border-t-[1px]">
        <FooterSection />
      </div>
    </FlexColumn>
  );
}
