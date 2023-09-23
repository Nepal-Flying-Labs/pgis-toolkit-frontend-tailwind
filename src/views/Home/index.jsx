import React from 'react';
import Navbar from '@Components/Home/Navbar/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import HomeBanner from '@Components/Home/Banner/index';
import About from '@Components/Home/About/index';
import Working from '@Components/Home/Working/index';
import Features from '@Components/Home/Features/index';
import DataUnderstanding from '@Components/Home/Understanding/index';
import SupportSection from '@Components/Home/Supports/index';
import UseCaseSection from '@Components/Home/UseCases/index';
import PartnerSection from '@Components/Home/Partners/index';

export default function Home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getLandingPageRequest({ page: 'home' }));
  // }, [dispatch]);

  return (
    <FlexColumn>
      <div className="naxatw-w-full naxatw-flex naxatw-items-center naxatw-justify-end naxatw-bg-[#212121] naxatw-py-1 naxatw-px-[156px] naxatw-gap-3">
        <p className="naxatw-text-white">EN</p>
        <p className="naxatw-text-white">|</p>
        <p className="naxatw-text-white">ने</p>
      </div>
      <FlexColumn className="naxatw-w-full naxatw-bg-gradient-to-t naxatw-to-[#FF5A5F] naxatw-from-[#A41D55]  naxatw-py-8 naxatw-px-[156px]">
        <Navbar />
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
    </FlexColumn>
  );
}
