import React from 'react';
import { useDispatch } from 'react-redux';
import Creators from '@Actions/authentication';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import { Avatar } from '@src/constants/svgIcons';

const { loginRequest } = Creators;

const initialState = {
  fullname: '',
  email: '',
  username: '',
  password: '',
  address: '',
  phoneNumber: '',
};

export default function SignUp() {
  const dispatch = useDispatch();
  const { values, meta, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: [
      'fullname',
      'email',
      'username',
      'password',
      'address',
      'phoneNumber',
    ],
    onSubmit: data => {
      console.log(data, 'datax');
      // dispatch(loginRequest(data));
    },
  });

  return (
    <>
      <div className="naxatw-flex naxatw-flex-col naxatw-justify-center">
        <figure className="naxatw-flex naxatw-justify-center">{Avatar}</figure>
        <h3 className="naxatw-font-bold naxatw-mt-3 naxatw-tracking-wide">
          Sign up
        </h3>
      </div>
      <div className="naxatw-w-full naxatw-mt-[3.125rem]">
        <div className="mb-6 naxatw-space-y-[1.125rem]">
          <div className="naxatw-space-y-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
              Full Name
            </label>
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="fullname"
              placeholder="Full Name"
              value={values.fullname}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="naxatw-space-y-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
              Email address
            </label>
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              disabled
              {...inputProps}
            />
          </div>

          <div className="naxatw-flex naxatw-gap-1.5">
            <div className="naxatw-space-y-2">
              <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
                Username
              </label>
              <input
                type="text"
                className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
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
          </div>

          <div className="naxatw-flex naxatw-gap-1.5">
            <div className="naxatw-space-y-2">
              <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
                Address
              </label>
              <input
                type="text"
                className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
                name="address"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
                {...inputProps}
              />
            </div>
            <div className="naxatw-space-y-2">
              <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[0.9357rem]">
                Phone Number
              </label>
              <input
                type="text"
                className="naxatw-block naxatw-w-full naxatw-px-4 naxatw-py-2 naxatw-font-normal naxatw-text-gray-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-gray-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gray-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
                name="phoneNumber"
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                {...inputProps}
              />
            </div>
          </div>
        </div>
        <Button
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-text-[0.9357rem] naxatw-font-bold naxatw-w-full naxatw-mt-12"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
