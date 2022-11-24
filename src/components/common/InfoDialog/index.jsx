import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from '../MaterialIcon/index';

const getStatus = status => {
  switch (status) {
    case 'info':
      return { icon: 'info', bgColor: 'naxatw-bg-[#E1EDFB]' };
    case 'success':
      return { icon: 'check_circle', bgColor: 'naxatw-bg-[#DFF2F1]' };
    case 'error':
      return { icon: 'cancel', bgColor: 'naxatw-bg-primary-200' };
    default:
      return 'info';
  }
};

export default function InfoDialog({ status, children }) {
  const infoStatus = getStatus(status);
  return (
    <div
      className={`${infoStatus.bgColor} naxatw-flex naxatw-items-center naxatw-gap-x-3 naxatw-rounded-md naxatw-p-3 naxatw-mb-10`}
    >
      <MaterialIcon name={infoStatus.icon} />
      <span className="naxatw-text-body-lg">{children}</span>
    </div>
  );
}

InfoDialog.defaultProps = {
  status: 'info',
  // className: 'naxatw-bg-[#E1EDFB]',
  children: '',
};

InfoDialog.propTypes = {
  status: PropTypes.string,
  // className: PropTypes.string,
  children: PropTypes.node,
};
