/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions';
import { useHistory, useParams } from 'react-router';

const getStatusColor = status => {
  switch (status) {
    case 'draft':
      return '#757575';
    case 'completed':
      return '#40B449';
    case 'ongoing':
      return '#0076FF';
    default:
      return '#FFFFFF';
  }
};

export default function ProjectCard({
  title,
  address,
  status,
  id,
  onClick,
  toggle,
  setToggle,
}) {
  const ref = useRef();
  const onOutsideClick = useCallback(
    e => {
      if (!ref?.current?.contains(e.target)) {
        setToggle(null);
      }
    },
    [setToggle],
  );

  useEffect(() => {
    if (toggle) {
      window.addEventListener('click', onOutsideClick);
    } else {
      window.removeEventListener('click', onOutsideClick);
    }

    return () => {
      window.removeEventListener('click', onOutsideClick);
    };
  }, [toggle, onOutsideClick]);

  const { organizationId } = useParams();

  const history = useHistory();
  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: projectId => {
        console.log(projectId);
        history.push(
          `/organizations/${organizationId}/project-edit/${projectId}`,
        );
      },
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
    <div
      className={`naxatw-w-full naxatw-px-5 naxatw-py-4 ${
        status === 'draft' ? 'naxatw-bg-[#D7D7D7]' : 'naxatw-bg-white'
      } naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-cursor-pointer hover:naxatw-border-grey-800`}
      onClick={onClick}
    >
      <div className="naxatw-flex naxatw-justify-between">
        <h5>{title}</h5>
        {/* <DropdownOptions options={dropdownOptions} data={id} stopPropagation /> */}
        <div className="naxatw-relative naxatw-w-10 naxatw-flex">
          <a
            ref={ref}
            className="naxatw-inline-flex naxatw-items-center naxatw-text-sm naxatw-font-medium naxatw-text-center naxatw-text-grey-800  naxatw-rounded-lg hover:naxatw-bg-grey-100 focus:naxatw-ring-4 focus:naxatw-outline-none focus:ring-grey-50 naxatw-select-none"
            onClick={e => {
              setToggle(id);

              e.stopPropagation();
            }}
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div
            id="dropdownDots"
            className={`${
              toggle ? '' : 'naxatw-hidden'
            } naxatw-absolute naxatw-top-[2px] naxatw-right-[42px] naxatw-z-10 naxatw-w-[12.5rem] naxatw-bg-white naxatw-rounded-lg naxatw-divide-y naxatw-divide-grey-100 naxatw-shadow-3xl`}
          >
            <ul
              className="naxatw-py-2 naxatw-text-sm naxatw-text-grey-700"
              aria-labelledby="dropdownMenuIconButton"
            >
              {dropdownOptions.map(
                ({ id: optionId, label, onClick: handleClick }) => (
                  <li
                    key={optionId}
                    className="naxatw-block naxatw-py-[13px] naxatw-px-3 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
                  >
                    <a
                      onClick={e => {
                        handleClick(id);
                        e.stopPropagation();
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="naxatw-mt-2 naxatw-flex naxatw-gap-x-3 naxatw-items-center">
        <p>{address}</p>
        <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
          <span
            className={`naxatw-w-2 naxatw-h-2 naxatw-rounded-full naxatw-bg-[${getStatusColor(
              status,
            )}]`}
          />
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}

ProjectCard.defaultProps = {
  title: '',
  address: '',
  status: '',
  onClick: () => {},
  id: null,
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
};
