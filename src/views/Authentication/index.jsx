import React from 'react';
import { useLocation } from 'react-router';
import LoginImg from '@Assets/images/sign-in-img.jpg';
import LoginLogo from '@Assets/images/login-logo.png';
import Button from '@Components/common/Button';
import SignIn from '@Components/Authentication/SignIn';
import SignUp from '@Components/Authentication/SignUp';
import ForgotPassword from '@Components/Authentication/ForgotPassword';

export default function Authentication() {
  const { pathname } = useLocation();

  const getContent = () => {
    switch (pathname) {
      case '/login':
        return <SignIn />;
      case '/sign-up':
        return <SignUp />;
      case '/forgot-password':
        return <ForgotPassword />;
      default:
        return <SignIn />;
    }
  };

  return (
    <main className="naxatw-h-screen naxatw-p-6 naxatw-font-primary">
      <div className="naxatw-h-full naxatw-px-4">
        <div className="naxatw-flex naxatw-h-full naxatw-flex-wrap">
          <div className="sm:naxatw-h-full">
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
                    <img className="naxatw-h-10" src={LoginLogo} alt="logo" />
                  </a>
                </div>
                <div className="naxatw-mt-20">
                  <h3 className="naxatw-text-white naxatw-mb-5 naxatw-font-bold">
                    Integrated Mapping tool for Spatial Data-driven
                    Interventions Planning
                  </h3>
                  <p className="naxatw-text-white naxatw-text-lg naxatw-mb-10">
                    Piloting the tool for Transport Mobility Assessment
                  </p>
                  <Button className="naxatw-px-5 naxatw-py-3 naxatw-bg-white naxatw-rounded-lg naxatw-text-primary-400 naxatw-font-bold">
                    Request for Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="naxatw-grow naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-relative">
            <div className="naxatw-absolute naxatw-right-0 naxatw-top-0 naxatw-flex naxatw-gap-4 naxatw-items-center">
              <p className="naxatw-text-body-lg">Don&apos;t have an account?</p>
              <Button className="naxatw-btn-secondary">Get Started</Button>
            </div>
            <div className="naxatw-mx-auto naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-text-center naxatw-w-[27.5rem]">
              {getContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
