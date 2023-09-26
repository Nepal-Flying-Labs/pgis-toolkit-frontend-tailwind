import React from 'react';
import LoginImg from '@Assets/images/sign-in-img.jpg';
// import LoginLogo from '@Assets/images/login-logo.png';
import LoginLogo from '@Assets/images/logo.svg';
import Links from '@Components/common/Link/index';
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
            <Links to="/">
              <img
                className="naxatw-h-10 naxatw-w-[120px]"
                src={LoginLogo}
                alt="logo"
              />
            </Links>
          </div>
          <div className="naxatw-mt-10">
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
              Store, Map and Analyse mobility related spatial datasets with
              communities
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
