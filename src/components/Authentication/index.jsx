import React from 'react';
import LoginImg from '@Assets/images/main-header-img.jpg';
// import LoginLogo from '@Assets/images/login-logo.png';
import LoginLogo from '@Assets/images/usafiri-beta-white-logo.svg';
import GoogleIcon from '@Assets/images/icons/google-icon.svg';
import Button from '@Components/common/Button';
import { Avatar } from '@src/constants/svgIcons';

export default function Authentication() {
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
                // backgroundImage: `url(${LoginImg}), linear-gradient(180deg, #FF5A5F 15.13%, #A41D55 100%)`,
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
            <div className="naxatw-absolute  naxatw-right-14 naxatw-top-8 naxatw-flex naxatw-gap-4 naxatw-items-center">
              <p>Don&apos;t have an accountx?</p>
              <Button className="naxatw-border-2 naxatw-border-grey-400 naxatw-px-6 naxatw-py-4 naxatw-rounded-xl naxatw-text-secondary-400 naxatw-font-bold">
                Get Started
              </Button>
            </div>
            <div className="naxatw-mx-auto naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-text-center naxatw-w-[54rem] naxatw-p-16">
              <div className="">
                <figure>{Avatar}</figure>
                <h3 className="naxatw-font-bold naxatw-mt-6">Sign in</h3>
              </div>
              <div className="naxatw-w-full">
                <Button className="naxatw-border-2 naxatw-border-grey-400 naxatw-px-10 naxatw-py-3 naxatw-w-full naxatw-rounded-xl naxatw-mt-12">
                  <img
                    width={10}
                    height={10}
                    src={GoogleIcon}
                    alt="google-icon"
                  />
                  <p className="naxatw-font-bold">Sign in with Google</p>
                </Button>

                <hr className="naxatw-my-8 naxatw-h-px naxatw-bg-grey-200 naxatw-border-0" />

                <div className="mb-6 naxatw-space-y-8">
                  <div className="">
                    <label className="naxatw-w-full naxatw-text-left">
                      Email address
                    </label>
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 font-normal text-grey-700 bg-white bg-clip-padding border border-solid border-grey-300 rounded transition ease-in-out m-0 focus:text-grey-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="">
                    <label className="naxatw-w-full naxatw-text-left">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 font-normal text-grey-700 bg-white bg-clip-padding border border-solid border-grey-300 rounded transition ease-in-out m-0 focus:text-grey-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>

                  <div className="naxatw-flex naxatw-items-start naxatw-mb-6 naxatw-justify-between">
                    <div className="naxatw-flex naxatw-items-center h-5">
                      <input
                        id="keep-me"
                        type="checkbox"
                        value=""
                        className="naxatw-w-4 naxatw-h-4 naxatw-bg-grey-50 naxatw-rounded naxatw-border naxatw-border-grey-300 naxatw-focus:ring-3 naxatw-focus:ring-blue-300"
                        required
                      />
                      <label htmlFor="keep-me" className="">
                        Keep Me Signed In
                      </label>
                    </div>
                    <div>
                      <Button>Forgot your password?</Button>
                    </div>
                  </div>
                </div>
                <Button className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-w-full naxatw-mt-12">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
