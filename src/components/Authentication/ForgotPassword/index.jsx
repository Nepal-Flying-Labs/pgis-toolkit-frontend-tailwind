import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@Components/common/Button';

export default function ForgotPassword() {
  return (
    <>
      <div className="">
        <h3 className="naxatw-font-bold naxatw-tracking-wider">
          Forgot your password?
        </h3>
        <p className="naxatw-mt-3">
          We’ll help you reset it and get back on track.
        </p>
      </div>

      <div className="naxatw-w-full naxatw-mt-10">
        <div className="naxatw-space-y-2">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
            Email address
          </label>
          <input
            type="text"
            className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
            name="email"
            placeholder="Email address"
          />
        </div>
      </div>
      <Button className="naxatw-btn-primary naxatw-w-full naxatw-mt-7">
        Reset password
      </Button>
      <Link
        to="/login"
        className="naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-text-secondary-400 naxatw-font-bold naxatw-w-full naxatw-mt-1"
      >
        Back
      </Link>
    </>
  );
}
