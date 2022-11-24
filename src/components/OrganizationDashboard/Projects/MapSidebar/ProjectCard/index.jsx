/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions';

export default function ProjectCard({ title, address, status }) {
  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: () => {},
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: () => {},
    },
  ];

  return (
    <div className="naxatw-w-full naxatw-px-5 naxatw-py-4 naxatw-bg-white naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-cursor-pointer hover:naxatw-border-grey-800">
      <div className="naxatw-flex naxatw-justify-between">
        <h5>{title}</h5>
        <DropdownOptions options={dropdownOptions} />
      </div>
      <div className="naxatw-mt-2">
        <p>{address}</p>
      </div>
    </div>
  );
}

ProjectCard.defaultProps = {
  title: '',
  address: '',
  status: '',
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.string,
};
