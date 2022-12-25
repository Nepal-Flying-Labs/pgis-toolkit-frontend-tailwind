/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DropdownOptions from '@Components/common/DropdownOptions';
import { useHistory, useParams } from 'react-router';
import AvatarImage from '@Assets/images/img-sm-avatar.png';
import Button from '@Components/common/Button/index';
import { format } from 'date-fns';
import MaterialIcon from '@Components/common/MaterialIcon/index';

const getStatusColor = status => {
  switch (status) {
    case 'draft':
      return {
        bgColor: 'naxatw-bg-[#757575]',
        textColor: 'naxatw-text-[#757575]',
      };
    case 'completed':
      return {
        bgColor: 'naxatw-bg-[#40B449]',
        textColor: 'naxatw-text-[#40B449]',
      };
    case 'ongoing':
      return {
        bgColor: 'naxatw-bg-[#0076FF]',
        textColor: 'naxatw-text-[#0076FF]',
      };
    default:
      return {
        bgColor: 'naxatw-bg-[#757575]',
        textColor: 'naxatw-text-[#757575]',
      };
  }
};

export default function ProjectGridCard({
  title,
  address,
  status,
  id,
  onClick,
  coverImage,
  toggle,
  setToggle,
  startDate,
  endDate,
  thematicAreas,
}) {
  function ellipsify(str) {
    if (str?.length > 60) {
      return `${str.substring(0, 60)} ...`;
    }
    return str;
  }
  const ref = useRef();
  const statusColor = getStatusColor(status);
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
      className={` naxatw-border naxatw-rounded-xl hover:naxatw-bg-[#F5F5F5] hover:naxatw-border-grey-800 naxatw-shadow-3xl naxatw-cursor-pointer naxatw-min-h-[408px] naxatw-max-h-[415px] naxatw-min-w-[321px] naxatw-flex naxatw-flex-col naxatw-justify-between  ${
        status === 'draft' ? 'naxatw-bg-[#F5F5F5]' : 'naxatw-bg-white'
      }`}
      onClick={onClick}
    >
      <div className="">
        <div className="naxatw-h-[200px]">
          <img
            className=" naxatw-object-cover naxatw-w-full naxatw-h-full naxatw-rounded-t-xl"
            src={coverImage || AvatarImage}
            alt="cover_image"
          />
        </div>

        <div className="naxatw-pl-4 naxatw-py-3 naxatw-pr-2">
          <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
            <h5>{title || 'N/A'}</h5>
            <DropdownOptions
              options={dropdownOptions}
              data={id}
              stopPropagation
            />
          </div>
          <div className="naxatw-flex naxatw-flex-wrap naxatw-mt-2.5 naxatw-gap-x-3">
            <span className="naxatw-text-body-md">{`${
              format(new Date(startDate), 'MMM dd, yyyy') || 'N/A'
            } - ${format(new Date(endDate), 'MMM dd, yyyy') || 'N/A'}`}</span>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <span
                className={`naxatw-w-2 naxatw-h-2 naxatw-rounded-full ${statusColor.bgColor}`}
              />
              <span className={`${statusColor.textColor} naxatw-capitalize`}>
                {status || 'N/A'}
              </span>
            </div>
          </div>
          <div className="naxatw-mt-3">
            <p className="naxatw-text-body-sm naxatw-text-[#989898] naxatw-uppercase">
              Thematic areas
            </p>
            <span className="naxatw-text-body-md">
              {thematicAreas ? ellipsify(thematicAreas.toString()) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      {status !== 'draft' ? (
        <div className="naxatw-flex  naxatw-items-end">
          <Button
            className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] naxatw-w-[160.5px]"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            Info
          </Button>
          <Button
            className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] naxatw-w-[160.5px]"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            View on Map
          </Button>
        </div>
      ) : (
        <Button className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5]">
          Edit
        </Button>
      )}
    </div>
  );
}

ProjectGridCard.defaultProps = {
  title: '',
  address: '',
  status: '',
  onClick: () => {},
  id: null,
  coverImage: null,
};

ProjectGridCard.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
  coverImage: PropTypes.string,
};
