/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CustomDropdownOptions from '@Components/common/CustomDropdownOptions';
import { useHistory, useParams } from 'react-router';
import AvatarImage from '@Assets/images/img-sm-avatar.png';
import { Creators as CommonCreator } from '@Actions/common';
import { Creators } from '@Actions/organizationDashboard';
import Button from '@Components/common/Button/index';
import { format } from 'date-fns';

const { togglePromptDialog } = CommonCreator;
const { setSelectedProject, setZoomToLayer } = Creators;

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

export default function ProjectCard({
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
  bbox,
}) {
  const dispatch = useDispatch();
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

  const [hideTitle, setHideTitle] = useState(false);
  const titleLimit = 40;

  useEffect(() => {
    if (title.length > titleLimit) {
      setHideTitle(true);
    }
  }, [title]);

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
      onClick: () => {
        dispatch(setSelectedProject({ id, name: title }));
        dispatch(togglePromptDialog('delete-project'));
      },
    },
  ];

  return (
    <div
      className={`naxatw-flex naxatw-border naxatw-border-grey-300 naxatw-rounded-xl naxatw-cursor-pointer hover:naxatw-bg-[#F8F8F8] hover:naxatw-border-[#484848]  ${
        status === 'draft' ? 'naxatw-bg-[#F5F5F5]' : 'naxatw-bg-white'
      }`}
      onClick={onClick}
    >
      <div className=" naxatw-w-[120px] naxatw-h-full naxatw-min-w-[120px] naxatw-border naxatw-border-grey-200 naxatw-rounded-l-xl">
        <img
          className=" naxatw-object-cover naxatw-w-full naxatw-h-full naxatw-rounded-l-xl"
          src={coverImage || AvatarImage}
          alt="cover_image"
        />
      </div>

      <div className=" naxatw-pt-2 naxatw-pl-4 naxatw-pr-2 naxatw-pb-3 naxatw-flex  naxatw-w-full naxatw-justify-between naxatw-rounded-r-xl">
        <div className="">
          <h5 title={title} className="naxatw-line-clamp-2">
            {title || 'N/A'}
            {/* <h5
                className={`${
                      !hideTitle
                        ? 'naxatw-h-fit'
                        : 'naxatw-h-[2.78rem] naxatw-text-ellipsis naxatw-overflow-hidden'
                    } `}
                  >
                {hideTitle ? title.slice(0, titleLimit + 10) : title || 'N/A'}
              {hideTitle && (
                <span className="naxatw-inline-flex">
                  <span className="naxatw-px-1">...</span>
                  <button
                    type="button"
                    className="naxatw-text-secondary-400 hover:naxatw-underline"
                    onClick={e => {
                      e.stopPropagation();
                      setHideTitle(!hideTitle);
                    }}
                  >
                    See more
                  </button>
                </span>
              )}
             */}
          </h5>
          <div className="naxatw-flex naxatw-flex-wrap naxatw-mt-2.5 naxatw-gap-x-3">
            <span className="naxatw-text-body-md">{`${
              format(new Date(startDate), 'MMM dd, yyyy') || 'N/A'
            } - ${format(new Date(endDate), 'MMM dd, yyyy') || 'N/A'}`}</span>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <div
                className={`naxatw-w-2 naxatw-h-2 naxatw-rounded-full  ${statusColor.bgColor}`}
              />
              <p
                className={`${statusColor.textColor} naxatw-capitalize naxatw-text-body-md `}
              >
                {status || 'N/A'}
              </p>
            </div>
          </div>
          <div className="naxatw-mt-3">
            <p className="naxatw-text-body-sm naxatw-text-[#989898] naxatw-uppercase">
              Thematic areas
            </p>
            <div className="naxatw-line-clamp-2">
              <span className="naxatw-text-body-md">
                {thematicAreas ? thematicAreas.toString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <div className="naxatw-flex naxatw-flex-col naxatw-justify-between naxatw-items-end  ">
          <CustomDropdownOptions
            options={dropdownOptions}
            data={id}
            stopPropagation
          />
          {status !== 'draft' ? (
            <div className="naxatw-flex naxatw-flex-col naxatw-items-end">
              <Button
                className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5]"
                onClick={e => {
                  e.stopPropagation();
                  history.push(
                    `/organizations/${organizationId}/projects/${id}/info`,
                  );
                }}
              >
                Info
              </Button>
              <Button
                className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] naxatw-w-[124px]"
                onClick={e => {
                  e.stopPropagation();
                  dispatch(setZoomToLayer({ id, bbox }));
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
      </div>
    </div>
    // <div className="naxatw-flex naxatw-border naxatw-rounded-md">
    //   <img
    //     className="naxatw-w-[120px] naxatw-h-[164px] "
    //     src={AvatarIcon}
    //     alt="cover_image"
    //   />
    //   <div className=" naxatw-pt-4 naxatw-pl-4 naxatw-pr-2 naxatw-pb-3 naxatw-flex naxatw-bg-white">
    //     <div className="">
    //       <h5>Transportation mapping Kenya 2</h5>
    //       <div className="naxatw-flex naxatw-mt-2.5 naxatw-gap-x-3">
    //         <span>Jan 04, 2020 - Jan 04, 2024</span>
    //         <span>Ongoing</span>
    //       </div>
    //       <div className="naxatw-mt-3">
    //         <p className="naxatw-text-body-sm">Thematic areas</p>
    //         <span>
    //           Climate change and energy, Ecosystem services, Planetary Health,
    //           Sustainable Development ...
    //         </span>
    //       </div>
    //     </div>
    //     <div className="naxatw-flex naxatw-flex-col naxatw-justify-between naxatw-items-end">
    //       <span>dropdown</span>
    //       <div className="naxatw-flex naxatw-flex-col naxatw-items-end">
    //         <Button className="naxatw-btn-secondary naxatw-btn-transparent">
    //           Info
    //         </Button>
    //         <Button className="naxatw-w-fit">View on Map</Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

ProjectCard.defaultProps = {
  title: '',
  address: '',
  status: '',
  onClick: () => {},
  id: null,
  coverImage: null,
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
  coverImage: PropTypes.string,
};
