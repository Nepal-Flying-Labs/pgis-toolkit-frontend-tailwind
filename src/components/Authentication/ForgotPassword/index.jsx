import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@Components/common/Button';

export default function ForgotPassword() {
  return (
    <>
      <div className="">
        <h2 className="naxatw-font-bold naxatw-mt-6 naxatw-tracking-wider">
          Forgot your password?
        </h2>
        <p className="naxatw-mt-4">
          We’ll help you reset it and get back on track.
        </p>
      </div>

      <div className="naxatw-w-full naxatw-mt-16">
        <div className="mb-6 naxatw-space-y-8">
          <div className="">
            <label className="naxatw-w-full naxatw-text-left">
              Email address
            </label>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
            />
          </div>
        </div>
      </div>
      <Button className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-w-full naxatw-mt-12">
        Reset password
      </Button>
      <Link
        to="/login"
        className="naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-text-secondary-400 naxatw-font-bold naxatw-w-full naxatw-mt-2"
      >
        Back
      </Link>
    </>
  );
}
