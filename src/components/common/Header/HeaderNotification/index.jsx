import React from 'react';
import NotificationIcon from '@Assets/images/icons/notification-icon.svg';

export default function HeaderNotification() {
  return (
    <figure className="naxatw-w-10 naxatw-h-10 naxatw-flex naxatw-items-center naxatw-justify-center naxatw-relative">
      <span className="naxatw-bg-[#FF0F0F] naxatw-rounded-full naxatw-w-[0.875rem] naxatw-h-[0.875rem] naxatw-text-white naxatw-text-xs naxatw-font-bold naxatw-absolute naxatw-top-0 naxatw-right-0 naxatw-flex naxatw-items-center naxatw-justify-center">
        3
      </span>
      <img
        className="naxatw-h-6"
        src={NotificationIcon}
        alt="avatar-placeholder"
      />
    </figure>
  );
}
