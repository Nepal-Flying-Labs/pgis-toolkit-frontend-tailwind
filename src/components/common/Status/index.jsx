/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import Spinner from '../Spinner/index';
import Tooltip from '../Tooltip/index';
import MaterialIcon from '../MaterialIcon/index';

const getColor = status => {
  switch (status) {
    case true:
      return { bg: 'naxatw-bg-[#40B449]', text: 'naxatw-text-[#40B449]' };
    case false:
      return { bg: 'naxatw-bg-[#FF0F0F]', text: 'naxatw-text-[#FF0F05]' };
    default:
      return { bg: 'naxatw-bg-[#0076FF]', text: 'naxatw-text-[#0076FF]' };
  }
};

const getInvitationStatus = inviteStatus => {
  switch (inviteStatus) {
    case 'pending':
      return { name: 'update', color: 'naxatw-text-[#0076FF]' };
    case 'expired':
      return { name: 'report', color: 'naxatw-text-[#FF0F05]' };
    default:
      return '';
  }
};

const Status = ({ status, invitationStatus, isLoading }) => {
  const stat = getColor(status);
  const inviteStat = getInvitationStatus(invitationStatus?.toLowerCase());
  return (
    <div className=" naxatw-flex naxatw-items-center naxatw-gap-x-2">
      <div className={`naxatw-w-2 naxatw-h-2 ${stat.bg} naxatw-rounded-full`} />
      <span className={`naxatw-text-body-md ${stat.text}`}>
        {status ? 'Active' : 'Inactive'}
      </span>
      {inviteStat && (
        <>
          <Tooltip content={invitationStatus} direction="right">
            <MaterialIcon
              name={inviteStat.name}
              className={`naxatw-text-icon-md naxatw-cursor-default ${inviteStat.color}`}
            />
          </Tooltip>
          {isLoading && (
            <Spinner className="naxatw-w-8 naxatw-h-8 naxatw-fill-secondary-400" />
          )}
        </>
      )}
    </div>
  );
};

export default Status;
