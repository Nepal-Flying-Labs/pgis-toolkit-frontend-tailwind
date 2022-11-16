import React from 'react';
import { useLocation } from 'react-router';
import LoginImg from '@Assets/images/main-header-img.jpg';
import LoginLogo from '@Assets/images/login-logo.png';
import Button from '@Components/common/Button';
import SignIn from '@Components/Authentication/SignIn';
import ForgotPassword from '@Components/Authentication/ForgotPassword';

export default function Authentication() {
  const { pathname } = useLocation();

  const getContent = () => {
    switch (pathname) {
      case '/login':
        return <SignIn />;
      case '/forgot-password':
        return <ForgotPassword />;
      default:
        return <SignIn />;
    }
  };

  return (
    <main className="naxatw-h-screen naxatw-p-8 naxatw-font-primary">
      <div className="naxatw-h-full naxatw-px-6">
        <div className="naxatw-flex naxatw-h-full naxatw-flex-wrap">
          <div
            style={{
              position: 'absolute',
              width: '36rem',
              height: '50rem',
              bottom: '2rem',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${LoginImg})`,
              mixBlendMode: 'multiply',
              borderBottomRightRadius: '2.5rem',
              borderBottomLeftRadius: '2.5rem',
            }}
          />
          <div className="naxatw-h-full">
            <div
              className="naxatw-h-full naxatw-w-[36rem] naxatw-rounded-[2.5rem] naxatw-p-14 naxatw-flex naxatw-min-h-full"
              style={{
                background:
                  'linear-gradient(180deg, #FF5A5F 15.13%, #A41D55 100%)',
              }}
            >
              <div className="">
                <div>
                  <a>
                    <img
                      className="naxatw-h-[4rem] "
                      src={LoginLogo}
                      alt="logo"
                    />
                  </a>
                </div>
                <div className="naxatw-mt-28">
                  <h3 className="naxatw-text-white naxatw-mb-10">
                    Integrated Mapping tool for Spatial Data-driven
                    Interventions Planning
                  </h3>
                  <p className="naxatw-text-white naxatw-text-lg naxatw-mb-16">
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
              <p>Don&apos;t have an account?</p>
              <Button className="naxatw-border-2 naxatw-border-grey-400 naxatw-px-6 naxatw-py-4 naxatw-rounded-xl naxatw-text-secondary-400 naxatw-font-bold">
                Get Started
              </Button>
            </div>
            <div className="naxatw-mx-auto naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-text-center naxatw-w-[54rem] naxatw-p-16">
              {getContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
