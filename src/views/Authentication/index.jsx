import React from 'react';
import { useLocation } from 'react-router';
import Button from '@Components/common/Button';
import SignInBanner from '@Components/Authentication/SignInBanner';
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
          <SignInBanner />

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
