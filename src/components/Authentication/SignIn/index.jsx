import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/authentication';
import InfoDialog from '@Components/common/InfoDialog';
import Button from '@Components/common/Button';
import useForm from '@Hooks/useForm';
import Input from '@Components/common/Input';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
// import GoogleIcon from '@Assets/images/icons/google-icon.svg';
import { Avatar } from '@src/constants/svgIcons';
import ButtonLink from '@Components/common/ButtonLink';
import { checkIfLoading } from '@Utils/loaderSelector';
import './styles.css';

const { loginRequest, getLandingPageRequest, setInfoDialogContent } = Creators;

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
  const { values, inputProps, handleChange, handleSubmit, meta } = useForm({
    initialValues: initialState,
    required: ['username', 'password'],
    onSubmit: data => {
      dispatch(loginRequest(data));
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      dispatch(getLandingPageRequest());
    }
  }, [dispatch]);

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
        {/* <Button className="naxatw-btn-secondary naxatw-w-full ">
          <div className="naxatw-flex naxatw-items-center">
            <img className="naxatw-mr-3" src={GoogleIcon} alt="google-icon" />
            <p className="naxatw-text-inherit">Sign in with Google</p>
          </div>
        </Button>

        <div className="naxatw-my-[28px] naxatw-flex naxatw-items-center">
          <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
          <p className="naxatw-mx-3 naxatw-text-sm">or</p>
          <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 naxatw-space-y-[1.125rem]">
            <Input
              label="Username or Email"
              type="text"
              className="naxatw-input"
              name="username"
              placeholder="Username or Email"
              value={values.username}
              onChange={handleChange}
              {...inputProps}
            />
            {meta.username.error && meta.username.touched && (
              <FormErrorMessage message="Username is required" />
            )}
            <div className="naxatw-relative">
              <Input
                label="Password"
                type={!isVisible ? 'password' : 'text'}
                className="naxatw-input "
                name="password"
                placeholder="**********"
                value={values.password}
                onChange={handleChange}
                {...inputProps}
              />
              {meta.password.error && meta.password.touched && (
                <FormErrorMessage message="Password is required" />
              )}
              <span
                onClick={() => setIsVisible(!isVisible)}
                className="material-icons naxatw-absolute naxatw-right-3 naxatw-top-10 naxatw-cursor-pointer"
              >
                {!isVisible ? 'visibility' : 'visibility_off'}
              </span>
            </div>
          </div>
          <div className="naxatw-flex naxatw-items-center naxatw-mb-5 naxatw-mt-2 naxatw-justify-between">
            <div className="naxatw-flex naxatw-items-start naxatw-gap-3">
              <input
                id="keep-me"
                type="checkbox"
                value=""
                className="naxatw-w-4 naxatw-h-4"
              />
              <label
                htmlFor="keep-me"
                className="naxatw-text-body-md naxatw-text-grey-800"
              >
                Keep me signed in
              </label>
            </div>
            <div>
              <ButtonLink
                to="/forgot-password"
                onClick={() => dispatch(setInfoDialogContent(''))}
              >
                Forgot your password?
              </ButtonLink>
            </div>
          </div>

          <Button
            className="naxatw-btn-primary naxatw-mt-[1.625rem] naxatw-w-full"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
            onClick={e => {
              e.preventDefault();
              handleSubmit(e);
            }}
            type="Submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
}
