import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Creators from '@Actions/organizations';
import Button from '@Components/common/Button';

const { toggleModal } = Creators;

export default function CreateOrganizationSuccess() {
  const createOrganizationDetail = useSelector(
    state => state.organizations.createOrganizationDetail,
  );
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="naxatw-mb-10 naxatw-space-y-8">
        <h4 className="naxatw-font-light">
          Organization successfully created.
        </h4>
        <p>Invite email has been sent to the following email addresses:</p>
        <div>
          {createOrganizationDetail?.email?.map(item => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <p>
          Please check your inbox and proceed ahead. If you didnt not recieve
          any email, <a href={() => {}}>click here to resend email</a>.
        </p>
      </div>

      <div className=" naxatw-mt-4 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold naxatw-mt-12"
          onClick={() => dispatch(toggleModal(false))}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
