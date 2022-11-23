import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import { Link } from 'react-router-dom';
import { Creators, Types } from '@Actions/authentication';
import { checkIfLoading } from '@Utils/loaderSelector';

const { resetPasswordRequest } = Creators;

export default function ResetPassword() {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.RESET_PASSWORD_REQUEST]),
  );
  const initialState = {
    new_password1: '',
    new_password2: '',
  };
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['new_password1', 'new_password2'],
    onSubmit: data => {
      dispatch(resetPasswordRequest({ token }, data));
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    setToken(urlToken);
    // dispatch(verifyUserRequest({ token }));
  }, [dispatch]);

  return (
    <div className="md:naxatw-w-[34.688rem] naxatw-container naxatw-mx-auto naxatw-mt-[15.938rem]">
      <div className="naxatw-flex naxatw-justify-center naxatw-mb-10">
        <h3 className="naxatw-font-bold naxatw-tracking-wider">
          Please Enter New Pasword
        </h3>
      </div>
      <div className="naxatw-bg-[#E1EDFB] naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-rounded-md naxatw-p-3 naxatw-mb-10">
        <span className="material-icons">info</span>
        <span className="naxatw-text-body-lg">
          Please make sure your Password add at least 8 characters.
        </span>
      </div>
      <div className="">
        <div className="mb-6 naxatw-space-y-[1.25rem]">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Password</label>
            <input
              type="password"
              className="naxatw-input"
              name="new_password1"
              placeholder="8+ characters"
              value={values.new_password1}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Confirm Password</label>
            <input
              type="password"
              className="naxatw-input"
              name="new_password2"
              value={values.new_password2}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
        </div>
        <Button
          className="naxatw-btn-primary naxatw-mt-7 naxatw-w-full"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Set New Password
        </Button>
        <Link
          to="/login"
          className="naxatw-mt-2 naxatw-flex naxatw-justify-center naxatw-px-5 naxatw-py-3 naxatw-rounded-lg naxatw-text-secondary-400 naxatw-font-bold naxatw-w-full naxatw-mt-1"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
