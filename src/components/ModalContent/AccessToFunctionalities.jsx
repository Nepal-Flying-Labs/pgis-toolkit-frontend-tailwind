import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@Components/common/Button';
import { Creators } from '@Actions/common';

const { toggleModal } = Creators;

const AccessToFunctionalities = () => {
  // const userGroup = useSelector(state => state.authentication.userGroup);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
        <span className="material-icons naxatw-h-12 naxatw-w-12 naxatw-text-5xl naxatw-text-secondary-400 naxatw-leading-10">
          verified
        </span>
        <h4 className="naxatw-font-normal">
          You are now logged in as a{' '}
          <span className="naxatw-font-primary naxatw-text-primary-400 naxatw-text-[1.5rem] naxatw-font-bold naxatw-leading-[1.875rem] naxatw-tracking-normal">
            Super User
          </span>
        </h4>
      </div>
      <div className="naxatw-mt-7">
        <span className="naxatw-text-body-lg">
          You now have access to following functionalities:
        </span>
        <ul className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-y-3.5 ">
          <li className="naxatw-flex naxatw-gap-x-3 naxatw-items-center">
            <span className="material-icons naxatw-h-6 naxatw-w-6 naxatw-text-secondary-400">
              check
            </span>
            <h6 className="naxatw-font-bold">Inviting Organization</h6>
          </li>
          <li className="naxatw-flex naxatw-gap-x-3 naxatw-items-center">
            <span className="material-icons naxatw-h-6 naxatw-w-6 naxatw-text-secondary-400">
              check
            </span>
            <h6 className="naxatw-font-bold">
              Viewing basic details of organization
            </h6>
          </li>
          <li className="naxatw-flex naxatw-gap-x-3 naxatw-items-center">
            <span className="material-icons naxatw-h-6 naxatw-w-6 naxatw-text-secondary-400">
              check
            </span>
            <h6 className="naxatw-font-bold">Managing Organization Details</h6>
          </li>
        </ul>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-mt-9 naxatw-mb-2">
        <Button
          className="naxatw-btn-primary  naxatw-w-20"
          onClick={() => dispatch(toggleModal())}
        >
          Got it
        </Button>
      </div>
    </div>
  );
};

export default AccessToFunctionalities;
