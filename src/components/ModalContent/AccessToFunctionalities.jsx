import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@Components/common/Button';
import { Creators } from '@Actions/common';
import { Types } from '@Actions/authentication';
import {
  webAdmin,
  organizationAdmin,
  projectAdmin,
} from '@src/constants/accessToFunctionalities';
import { checkIfLoading } from '@Utils/loaderSelector';

const { toggleModal } = Creators;

const getUserFunctionalities = role => {
  switch (role) {
    case 'PGIS Web App Administrator':
      return webAdmin;
    case 'Organization Admin':
      return organizationAdmin;
    case 'Project Manager':
      return projectAdmin;
    case 'Super Admin':
      return webAdmin;
    default:
      return [];
  }
};

const getArticle = role => {
  switch (role) {
    case 'PGIS Web App Administrator':
      return 'a';
    case 'Organization Admin':
      return 'an';
    case 'Project Manager':
      return 'a';
    case 'Super Admin':
      return 'a';
    default:
      return 'a';
  }
};

const AccessToFunctionalities = () => {
  const userProfile = useSelector(state => state.authentication.userProfile);
  const functionalities = getUserFunctionalities(userProfile?.role);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_USER_PROFILE_REQUEST]),
  );
  const dispatch = useDispatch();
  return (
    <div>
      {!loading ? (
        <div>
          <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
            <span className="material-icons naxatw-h-12 naxatw-w-12 naxatw-text-5xl naxatw-text-secondary-400 naxatw-leading-10">
              verified
            </span>
            <h4 className="naxatw-font-normal">
              You are now logged in as {getArticle(userProfile?.role)}{' '}
              <span className="naxatw-font-primary naxatw-text-primary-400 naxatw-text-[1.25rem] naxatw-leading-[1.75rem] naxatw-tracking-normal">
                {userProfile?.role || 'N/A'}
              </span>
            </h4>
          </div>
          <div className="naxatw-mt-7">
            <span className="naxatw-text-body-lg naxatw-flex naxatw-justify-start">
              You now have access to following functionalities:
            </span>
            <ul className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-y-3.5 ">
              {functionalities.map(functions => (
                <li
                  className="naxatw-flex naxatw-gap-x-3 naxatw-items-center"
                  key={functions.id}
                >
                  <span className="material-icons naxatw-h-6 naxatw-w-6 naxatw-text-secondary-400">
                    check
                  </span>
                  <p className="naxatw-text-body-btn">{functions.name}</p>
                </li>
              ))}
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
      ) : (
        <div className=" naxatw-min-h-[15rem] naxatw-animate-pulse naxatw-flex naxatw-flex-col naxatw-gap-y-5">
          <div>
            <div className="naxatw-h-5 naxatw-w-[20rem] naxatw-bg-grey-200" />
            <div className="naxatw-h-4 naxatw-w-[25rem] naxatw-mt-5 naxatw-bg-grey-200" />
          </div>
          <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-3">
            <div className="naxatw-h-4 naxatw-w-[30rem] naxatw-mt-10 naxatw-bg-grey-200" />
            <div className="naxatw-h-4 naxatw-w-full naxatw-mt-2 naxatw-bg-grey-200" />
            <div className="naxatw-h-4 naxatw-w-full naxatw-mt-2 naxatw-bg-grey-200" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessToFunctionalities;
