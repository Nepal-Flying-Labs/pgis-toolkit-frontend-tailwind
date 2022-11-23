import React from 'react';
import PropTypes from 'prop-types';

const getStatus = status => {
  switch (status) {
    case 'info':
      return 'info';
    case 'check':
      return 'check_circle';
    default:
      return 'info';
  }
};

export default function InfoDialog({ status, className, children }) {
  return (
    <div
      className={`${className} naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-rounded-md naxatw-p-3 naxatw-mb-10`}
    >
      <span className="material-icons">{getStatus(status)}</span>
      <span className="naxatw-text-body-lg">{children}</span>
    </div>
  );
}

InfoDialog.defaultProps = {
  status: 'info',
  className: 'naxatw-bg-[#E1EDFB]',
  children: '',
};

InfoDialog.propTypes = {
  status: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
