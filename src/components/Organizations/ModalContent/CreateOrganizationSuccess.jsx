import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/common';
import Button from '@Components/common/Button';

const { toggleModal } = Creators;

export default function CreateOrganizationSuccess() {
  const createOrganizationDetail = useSelector(
    state => state.organizations.createOrganizationDetail,
  );
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="naxatw-mb-10 naxatw-space-y-8 ">
        <h4 className="naxatw-font-light">
          An organization has been successfully created.
        </h4>
        <p>An email invitation has been sent to the listed email addresses :</p>
        <div>
          {createOrganizationDetail?.email?.map(item => (
            <div
              className="naxatw-flex naxatw-gap-x-3 naxatw-items-center"
              key={item}
            >
              <span className="material-icons naxatw-text-icon-md naxatw-text-secondary-400 ">
                mail_outline
              </span>
              <p className="naxatw-text-body-btn">{item}</p>
            </div>
          ))}
        </div>
        <p className="">
          Please check your inbox and proceed ahead.
          {/* If you didnt not recieve
          any email,{' '}
          <a
            href={() => {}}
            className="naxatw-underline naxatw-text-secondary-400"
          >
            click here to resend email
          </a>
          . */}
        </p>
      </div>

      <div className=" naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold "
          onClick={() => dispatch(toggleModal())}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
