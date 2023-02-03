/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import Input from '@Components/common/Input';
import { Creators, Types } from '@Actions/authentication';
import { checkIfLoading } from '@Utils/loaderSelector';

const { changePasswordRequest } = Creators;

const validatePassword = word => {
  const error = word.toString().length < 8;
  const message = !error
    ? ''
    : !word
    ? 'Required'
    : 'Password should be more than 8 characters';
  return {
    error,
    message,
  };
};

const validateConfirmPassword = (pass1, pass2) => {
  const error = !pass2 || pass1 !== pass2;
  const message = !pass2 ? 'Required' : 'Passwords do not match';
  return {
    error,
    message,
  };
};

export default function PasswordSettings() {
  // const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const [visibilityToggle, setVisibilityToggle] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.CHANGE_PASSWORD_REQUEST]),
  );
  const initialState = {
    old_password: '',
    new_password1: '',
    new_password2: '',
  };
  const { meta, values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['old_password', 'new_password1', 'new_password2'],
    validationSchema: {
      // old_password: validatePassword,
      new_password1: validatePassword,
      new_password2: value =>
        validateConfirmPassword(values.new_password1, value),
    },
    onSubmit: data => {
      dispatch(changePasswordRequest(data));
    },
  });

  // useEffect(() => {
  //   // const urlParams = new URLSearchParams(window.location.search);
  //   // const urlToken = urlParams.get('token');
  //   // setToken(urlToken);
  //   dispatch(
  //     setInfoDialogContent({
  //       message: 'Please make sure your password is at least 8 characters',
  //       status: 'info',
  //     }),
  //   );
  //   // dispatch(verifyUserRequest({ token }));
  // }, [dispatch]);

  return (
    <div className="naxatw-container naxatw-mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-6 naxatw-space-y-[1.25rem]">
            <Input
              label="Old Password"
              type={`${visibilityToggle ? 'text' : 'password'}`}
              className="naxatw-input"
              name="old_password"
              placeholder="********"
              value={values.old_password}
              onChange={handleChange}
              {...inputProps}
            />
            {meta.old_password.error && meta.old_password.touched && (
              <FormErrorMessage message={meta.old_password.message} />
            )}
            <Input
              label="New Password"
              type={`${visibilityToggle ? 'text' : 'password'}`}
              className="naxatw-input"
              name="new_password1"
              placeholder="********"
              value={values.new_password1}
              onChange={handleChange}
              {...inputProps}
            />
            {meta.new_password1.error && meta.new_password1.touched && (
              <FormErrorMessage message={meta.new_password1.message} />
            )}

            <Input
              label="Confirm Password"
              type={`${visibilityToggle ? 'text' : 'password'}`}
              className="naxatw-input"
              name="new_password2"
              placeholder="********"
              value={values.new_password2}
              onChange={handleChange}
              {...inputProps}
            />
            {meta.new_password2.error && meta.new_password2.touched && (
              <FormErrorMessage message={meta.new_password2.message} />
            )}

            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
              <input
                id="view-password"
                type="checkbox"
                className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-accent-grey-800"
                onClick={() => setVisibilityToggle(prev => !prev)}
              />
              <label className="naxatw-text-body-lg" htmlFor="view-password">
                View Password
              </label>
            </div>
          </div>
          <div className="naxatw-flex naxatw-justify-center ">
            <Button
              className="naxatw-btn-primary naxatw-mt-7 naxatw-w-fit "
              isLoading={loading}
              loaderClassName="naxatw-fill-secondary-400"
              onClick={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
              type="Submit"
            >
              Change Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
