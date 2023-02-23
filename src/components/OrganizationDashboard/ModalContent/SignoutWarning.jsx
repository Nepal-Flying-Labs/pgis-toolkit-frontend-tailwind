import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/authentication';
import { checkIfLoading } from '@Utils/loaderSelector';
import Button from '@Components/common/Button';

const { togglePromptDialog } = CommonCreators;
const { logoutRequest } = Creators;

export default function SignoutWarning() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state =>
    checkIfLoading(state, [Types.LOGOUT_REQUEST]),
  );

  const handleLogout = () => {
    dispatch(togglePromptDialog());
    dispatch(logoutRequest());
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-px-4">
        <h4 className="naxatw-text-center">
          Project page not available as you have not completed the project
          setup. You can logout for now and complete your profile later
        </h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-12 naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Continue Setup
        </Button>
        <Button
          className="naxatw-bg-[#FF0F0F] naxatw-text-white"
          iconLeft="delete_outline"
          isLoading={isLoading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
