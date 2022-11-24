import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/authentication';
import Button from '@Components/common/Button';
import ButtonLink from '@Components/common/ButtonLink';
import { checkIfLoading } from '@Utils/loaderSelector';

const { forgotPasswordRequest } = Creators;

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.FORGOT_PASSWORD_REQUEST]),
  );

  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(forgotPasswordRequest({ username_or_email: email }));
  };
  return (
    <>
      <div className="">
        <h3 className="naxatw-font-bold">Forgot your password?</h3>
        <p className="naxatw-mt-3">
          We’ll help you reset it and get back on track.
        </p>
      </div>

      <div className="naxatw-w-full naxatw-mt-10">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Email address</label>
          <input
            type="text"
            className="naxatw-input"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
      <Button
        onClick={e => handleSubmit(e)}
        isLoading={loading}
        loaderClassName="naxatw-fill-secondary-400"
        className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-w-full naxatw-mt-7"
      >
        Reset password
      </Button>
      <ButtonLink to="/login">Back</ButtonLink>
    </>
  );
}
