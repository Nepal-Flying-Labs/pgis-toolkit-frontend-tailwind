import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Creators } from '@Actions/authentication';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { Avatar } from '@src/constants/svgIcons';
import './styles.css';

const { loginRequest } = Creators;

const initialState = {
  username: '',
  password: '',
};

export default function SignIn() {
  const dispatch = useDispatch();
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['username', 'password'],
    onSubmit: data => {
      dispatch(loginRequest(data));
    },
  });

  return (
    <>
      <div className="">
        <figure className="naxatw-flex naxatw-justify-center">{Avatar}</figure>
        <h3 className="naxatw-font-bold naxatw-mt-3 naxatw-tracking-wide">
          Sign in
        </h3>
      </div>
      <div className="naxatw-w-full">
        <Button className="naxatw-btn-secondary naxatw-w-full naxatw-mt-[3.125rem]">
          <p>Sign in with Google</p>
        </Button>

        <hr className="naxatw-my-9 naxatw-h-px naxatw-bg-gray-200 naxatw-border-0" />

        <div className="mb-6 naxatw-space-y-[1.125rem]">
          <div className="naxatw-space-y-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
              Username
            </label>
            <input
              type="text"
              className="username"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="naxatw-space-y-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
              Password
            </label>
            <input
              type="password"
              className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="password"
              placeholder="**********"
              value={values.password}
              onChange={handleChange}
              {...inputProps}
            />
          </div>

          <div className="naxatw-flex naxatw-items-start naxatw-mb-6 naxatw-justify-between">
            <div className="naxatw-flex naxatw-items-start naxatw-gap-3">
              <input
                id="keep-me"
                type="checkbox"
                value=""
                // className="naxatw-w-4 naxatw-h-4 naxatw-bg-gray-50 naxatw-rounded naxatw-border naxatw-border-gray-300 naxatw-focus:ring-3 naxatw-focus:ring-blue-300"
                className="naxatw-w-4 naxatw-h-4"
                required
              />
              <label
                htmlFor="keep-me"
                className="naxatw-text-body-md naxatw-text-grey-800"
              >
                Keep me signed in
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="naxatw-text-secondary-400 naxatw-font-bold naxatw-tracking-wide naxatw-text-[0.9357rem]"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
        <Button
          className="naxatw-btn-primary naxatw-mt-12 naxatw-w-full"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
