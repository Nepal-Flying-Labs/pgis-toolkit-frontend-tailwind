/* eslint-disable arrow-body-style */
import React from 'react';
import { useHistory } from 'react-router';
import { Creators } from '@Actions/common';
import authActions from '@Actions/authentication';
import Button from '@Components/common/Button';
import { useDispatch } from 'react-redux';

const { toggleModal } = Creators;

const SignupSuccess = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-gap-y-4">
        <span className="material-icons naxatw-h-12 naxatw-w-12 naxatw-text-5xl naxatw-text-secondary-400 naxatw-leading-10">
          verified
        </span>
        <h4>Your account has been successfully created</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary naxatw-mt-[3rem] naxatw-w-[100px]"
          //   isLoading={loading}
          //   loaderClassName="naxatw-fill-secondary-400"
          onClick={() => {
            dispatch(
              authActions.setInfoDialogContent({
                message:
                  'To access your invited organization or project, please sign in.',
                status: 'success',
              }),
            );
            history.push('/login');
            dispatch(toggleModal());
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
