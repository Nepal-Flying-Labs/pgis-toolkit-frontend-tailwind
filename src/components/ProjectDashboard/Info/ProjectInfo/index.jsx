/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector } from 'react-redux';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import AvatarImage from '@Assets/images/user-avatar.png';
import ProjectIcon from '@Assets/images/project-icon.png';
import noImg from '@Assets/images/noImage.png';

const getWidth = (value, totalProject) => {
  return Math.floor((value / totalProject) * 100);
};

const ProjectInfo = () => {
  const organizationDetails = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  return (
    <div className="naxatw-w-full naxatw-bg-white naxatw-rounded-[20px] naxatw-h-full naxatw-border naxatw-border-[#D7D7D7]">
      {/* Header */}
      <div className="naxatw-p-7  naxatw-rounded-t-lg xl:naxatw-flex">
        <div className="naxatw-w-full xl:naxatw-w-3/4 naxatw-pr-5">
          <h3 className="naxatw-mb-2">Transportation mapping Kenya 1</h3>
          <div className="naxatw-flex naxatw-mb-5">
            <span className="naxatw-text-body-md naxatw-mr-1">
              Jan 04, 2020
            </span>{' '}
            <span className="naxatw-mr-1">-</span>
            <span className="naxatw-text-body-md naxatw-mr-2">
              Jan 04, 2020
            </span>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <div
                // eslint-disable-next-line react/jsx-curly-brace-presence
                className={`naxatw-bg-[#40B449] naxatw-w-2 naxatw-h-2 naxatw-rounded-full`}
              />
              <p className={` naxatw-capitalize naxatw-text-body-md `}>
                Completed
              </p>
            </div>
          </div>
          <div className="naxatw-mb-3">
            <p className="naxatw-text-body-btn naxatw-mb-1">
              Thematic focus areas
            </p>
            <p className="naxatw-text-body-lg">
              Climate change and energy, Ecosystem services, Planetary Health,
              Sustainable Development
            </p>
          </div>
          <div className="">
            <p className="naxatw-text-body-btn naxatw-mb-1">Project partners</p>
            <p className="naxatw-text-body-lg">
              UNDP, World Health Organization
            </p>
          </div>
        </div>
        <div className="naxatw-mt-5 naxatw-flex naxatw-justify-center xl:naxatw-mt-0 xl:naxatw-block">
          <img
            className="naxatw-rounded-lg naxatw-h-[195px] naxatw-w-[297px] naxatw-border naxatw-border-[#D7D7D7] naxatw-object-contain"
            src={noImg}
            alt=""
          />
        </div>
      </div>

      {/* Project objectives */}
      <div className="naxatw-pt-3 naxatw-px-7 naxatw-mb-7">
        <h4 className="naxatw-mb-2">Objectives</h4>
        <p className="naxatw-text-body-lg naxatw-text-justify">
          World Bicycle Relief is an international, non-profit organization
          based in Chicago, IL that specializes in large-scale, comprehensive
          bicycle distribution programs to aid poverty relief in developing
          countries around the world. Their programs focus primarily on
          education, economic development, and health care. We specializes in
          large-scale, comprehensive bicycle distribution programs to aid
          poverty relief in developing countries around the world. Their
          programs focus primarily on education, economic development, and
          health care.
        </p>
      </div>
      {/* contact person */}
      <div className="naxatw-px-7 ">
        <h4 className="naxatw-mb-3">Contact person </h4>
        <p className="naxatw-text-body-btn naxatw-mb-1">Harry Smith</p>
        <p className="naxatw-text-body-lg naxatw-mb-2">Project Manager</p>
        <div className="naxatw-gap-7 naxatw-flex">
          <div className="naxatw-gap-x-2 naxatw-flex">
            <MaterialIcon name="call" className="naxatw-text-[#FF5A5F]" />
            <span className="naxatw-text-body-lg">+61 920 2973 99</span>
          </div>
          <div className="naxatw-gap-x-2 naxatw-flex">
            <MaterialIcon
              name="mail_outline"
              className="naxatw-text-[#FF5A5F]"
            />
            <span className="naxatw-text-body-lg">harry_smith@mail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
