import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Creators from '@Actions/authentication';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { Avatar } from '@src/constants/svgIcons';

const { loginRequest } = Creators;

const initialState = {
  username: '',
  password: '',
};

export default function SignIn() {
  const dispatch = useDispatch();
  const { values, meta, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['username', 'password'],
    onSubmit: data => {
      dispatch(loginRequest(data));
    },
  });

  return (
    <>
      <div className="">
        <figure>{Avatar}</figure>
        <h2 className="naxatw-font-bold naxatw-mt-6 naxatw-tracking-wide">
          Sign in
        </h2>
      </div>
      <div className="naxatw-w-full">
        <Button className="naxatw-border-2 naxatw-border-grey-400 naxatw-px-10 naxatw-py-3 naxatw-w-full naxatw-rounded-xl naxatw-mt-12">
          <p className="naxatw-font-bold">Sign in with Google</p>
        </Button>

        <hr className="naxatw-my-14 naxatw-h-px naxatw-bg-gray-200 naxatw-border-0 naxatw-dark:bg-gray-700" />

        <div className="mb-6 naxatw-space-y-8">
          <div className="">
            <label className="naxatw-w-full naxatw-text-left">
              Email address
            </label>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="username"
              placeholder="Email address"
              value={values.username}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="">
            <label className="naxatw-w-full naxatw-text-left">Password</label>
            <input
              type="password"
              className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              {...inputProps}
            />
          </div>

          <div className="naxatw-flex naxatw-items-start naxatw-mb-6 naxatw-justify-between">
            <div className="naxatw-flex naxatw-items-start naxatw-gap-4">
              <input
                id="keep-me"
                type="checkbox"
                value=""
                // className="naxatw-w-4 naxatw-h-4 naxatw-bg-gray-50 naxatw-rounded naxatw-border naxatw-border-gray-300 naxatw-focus:ring-3 naxatw-focus:ring-blue-300 naxatw-dark:bg-gray-700 naxatw-dark:border-gray-600 naxatw-dark:focus:ring-blue-600 naxatw-dark:ring-offset-gray-800"
                className="naxatw-w-6 naxatw-h-6"
                required
              />
              <label htmlFor="keep-me" className="naxatw-font-normal">
                Keep me signed in
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="naxatw-text-secondary-400 naxatw-font-bold naxatw-tracking-wide"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
        <Button
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-w-full naxatw-mt-12"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
