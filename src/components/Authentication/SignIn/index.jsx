import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/authentication';
import InfoDialog from '@Components/common/InfoDialog';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import GoogleIcon from '@Assets/images/icons/google-icon.svg';
import { Avatar } from '@src/constants/svgIcons';
import ButtonLink from '@Components/common/ButtonLink';
import { checkIfLoading } from '@Utils/loaderSelector';
import './styles.css';

const { loginRequest } = Creators;

const initialState = {
  username: '',
  password: '',
};

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.LOGIN_REQUEST]),
  );
  const infoDialogContent = useSelector(
    state => state.authentication.infoDialogContent,
  );
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
      <div className="naxatw-mb-[3.125rem]">
        <figure className="naxatw-flex naxatw-justify-center">{Avatar}</figure>
        <h3 className="naxatw-font-bold naxatw-mt-3">Sign in</h3>
      </div>
      <div className="naxatw-w-full">
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
        <Button className="naxatw-btn-secondary naxatw-w-full ">
          <img className="naxatw-mr-3" src={GoogleIcon} alt="google-icon" />
          <p>Sign in with Google</p>
        </Button>

        <div className="naxatw-my-[28px] naxatw-flex naxatw-items-center">
          <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
          <p className="naxatw-mx-3 naxatw-text-sm">or</p>
          <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
        </div>

        <div className="mb-6 naxatw-space-y-[1.125rem]">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Username</label>
            <input
              type="text"
              className="naxatw-input"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="naxatw-space-y-2 naxatw-relative">
            <label className="naxatw-label">Password</label>
            <input
              type={!isVisible ? 'password' : 'text'}
              className="naxatw-input "
              name="password"
              placeholder="**********"
              value={values.password}
              onChange={handleChange}
              {...inputProps}
            />
            <span
              onClick={() => setIsVisible(!isVisible)}
              className="material-icons naxatw-absolute naxatw-right-3 naxatw-top-9 naxatw-cursor-pointer"
            >
              {!isVisible ? 'visibility' : 'visibility_off'}
            </span>
          </div>

          <div className="naxatw-flex naxatw-items-center naxatw-mb-6 naxatw-justify-between">
            <div className="naxatw-flex naxatw-items-start naxatw-gap-3">
              <input
                id="keep-me"
                type="checkbox"
                value=""
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
              <ButtonLink to="/forgot-password">
                Forgot your password?
              </ButtonLink>
            </div>
          </div>
        </div>
        <Button
          className="naxatw-btn-primary naxatw-mt-[1.625rem] naxatw-w-full"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}
