/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/authentication';
import Button from '@Components/common/Button';
import InfoDialog from '@Components/common/InfoDialog';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import ButtonLink from '@Components/common/ButtonLink';
import { checkIfLoading } from '@Utils/loaderSelector';
import Input from '@Components/common/Input';
import useForm from '@Hooks/useForm';

const { forgotPasswordRequest, setInfoDialogContent } = Creators;

const initialState = {
  email: '',
};

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const infoDialogContent = useSelector(
    state => state.authentication.infoDialogContent,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.FORGOT_PASSWORD_REQUEST]),
  );

  const { values, inputProps, handleChange, handleSubmit, meta } = useForm({
    initialValues: initialState,
    required: ['email'],
    onSubmit: data => {
      dispatch(forgotPasswordRequest({ username_or_email: values.email }));
    },
  });
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(forgotPasswordRequest({ username_or_email: email }));
  // };
  return (
    <>
      <div className="">
        <h3 className="naxatw-font-bold">Forgot your password?</h3>
        <p className="naxatw-mt-3">
          We’ll help you reset it and get back on track.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="naxatw-w-full">
        <div className="naxatw-w-full naxatw-mt-10">
          {infoDialogContent ? (
            <InfoDialog
              className="naxatw-bg-secondary-50"
              status={infoDialogContent.status}
            >
              {infoDialogContent.message}
            </InfoDialog>
          ) : (
            ''
          )}

          <Input
            label="Email Address"
            type="text"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={e => handleChange(e)}
            {...inputProps}
          />
          {meta.email.error && meta.email.touched && (
            <FormErrorMessage message="Please Enter Email or Username" />
          )}
        </div>
        <Button
          type="Submit"
          onClick={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-w-full naxatw-mt-7"
        >
          Reset password
        </Button>
        <div className="naxatw-mt-2 naxatw-flex naxatw-justify-center">
          <ButtonLink
            to="/login"
            onClick={() => dispatch(setInfoDialogContent(''))}
          >
            Back
          </ButtonLink>
        </div>
      </form>
    </>
  );
}
