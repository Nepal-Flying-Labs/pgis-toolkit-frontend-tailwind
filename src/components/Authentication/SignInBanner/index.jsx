import React from 'react';
import LoginImg from '@Assets/images/sign-in-img.jpg';
// import LoginLogo from '@Assets/images/login-logo.png';
import LoginLogo from '@Assets/images/logo.png';
// import Button from '@Components/common/Button';

export default function SignInBanner() {
  return (
    <div className="naxatw-hidden naxatw-h-full lg:naxatw-block">
      <div
        className="naxatw-h-full naxatw-w-[27.5rem] naxatw-rounded-[2.5rem] naxatw-p-10 naxatw-flex naxatw-min-h-full"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${LoginImg})`,
        }}
      >
        <div className="">
          <div>
            <a>
              <img
                className="naxatw-h-10 naxatw-w-[120px]"
                src={LoginLogo}
                alt="logo"
              />
            </a>
          </div>
          <div className="naxatw-mt-14">
            <h3 className="naxatw-text-white naxatw-mb-5 naxatw-font-bold">
              Transitioning from Paper-Based Community Mapping to Digital
              Participation
            </h3>
            {/* 
              <p className="naxatw-text-white naxatw-text-lg naxatw-mb-10">
                Piloting the tool for Transport Mobility Assessment
              </p>
             */}
            <p className="naxatw-text-white naxatw-text-lg naxatw-mb-10">
              An open-source, web gis based participatory tool that Adapts
              existing mapping tools Assembles existing data from multiple
              sources Validates & enhances data through community participation.
              The tool is co-designed with practitioners in the field of
              transportation need assessments, climate technology and geospatial
              applications design and development.The tool addresses the need
              for combining datasets from multiple sources via a web browser and
              allows basic levels of analysis to aid transport decision making.
            </p>
            {/* <Button className="naxatw-px-5 naxatw-py-3 naxatw-bg-white naxatw-rounded-lg naxatw-text-primary-400 naxatw-font-bold hover:naxatw-text-white hover:naxatw-bg-primary-700">
              Request for Demo
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
