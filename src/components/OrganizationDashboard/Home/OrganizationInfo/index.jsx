/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector } from 'react-redux';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import AvatarImage from '@Assets/images/user-avatar.png';
import ProjectIcon from '@Assets/images/project-icon.png';

const getWidth = (value, totalProject) => {
  return Math.floor((value / totalProject) * 100);
};

const OrganizationInfo = () => {
  const organizationDetails = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  // console.log('org details ', organizationDetails);
  return (
    <div className="naxatw-w-full naxatw-bg-white naxatw-rounded-xl naxatw-h-[calc(100vh-5rem)] naxatw-border naxatw-border-[#D7D7D7] naxatw-mb-5 md:naxatw-mb-0">
      <div className="naxatw-h-[calc(100vh-5.35rem)] naxatw-overflow-y-auto naxatw-overflow-hidden scrollbar">
        {/* Header */}
        <div className="naxatw-p-7  naxatw-rounded-t-lg naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-gap-x-5">
          <div className="naxatw-w-[60px] naxatw-h-[60px] naxatw-rounded-full">
            <img
              src={organizationDetails?.cover_image || AvatarImage}
              alt="organization-img"
              className="naxatw-w-[60px] naxatw-min-w-[60px] naxatw-h-[60px] naxatw-rounded-full"
            />
          </div>
          <div>
            <h3>{organizationDetails?.name || 'N/A'}</h3>
            <p className="naxatw-mt-[4px] naxatw-text-body-lg">
              {organizationDetails?.address || 'N/A'}
            </p>
            <div className="naxatw-mt-5 naxatw-flex naxatw-flex-wrap naxatw-gap-x-7 naxatw-gap-y-3">
              <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                <MaterialIcon
                  name="phone"
                  className="naxatw-text-icon-md naxatw-text-primary-400 "
                />
                <span className="naxatw-text-body-lg">
                  {organizationDetails?.contact || 'N/A'}
                </span>
              </div>
              <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                <MaterialIcon
                  name="mail_outline"
                  className="naxatw-text-icon-md naxatw-text-primary-400"
                />
                <span className="naxatw-text-body-lg">
                  {organizationDetails?.email || 'N/A'}
                </span>
              </div>
              <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
                <MaterialIcon
                  name="language"
                  className="naxatw-text-icon-md naxatw-text-primary-400"
                />
                <span className="naxatw-text-body-lg">
                  <a
                    className="naxatw-text-body-lg"
                    href={organizationDetails?.link || null}
                    target="_blank"
                    rel="noreferrer"
                    // onClick={organizationDetails?.link ? () => {} : () => false}
                  >
                    {organizationDetails?.link || 'N/A'}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Project Description */}
        <div className="naxatw-bg-[#F5F5F5] naxatw-p-7 naxatw-flex naxatw-flex-col naxatw-gap-y-2 md:naxatw-flex-row naxatw-gap-x-5 naxatw-items-center naxatw-justify-between">
          <div className="naxatw-flex naxatw-gap-x-5 ">
            <img
              className="naxatw-w-[60px] naxatw-h-[60px] naxatw-py-[3px]"
              alt="project-icon"
              src={ProjectIcon}
            />
            <div>
              <h5>Projects</h5>
              <h3>{organizationDetails?.projects}</h3>
            </div>
          </div>
          <div className="naxatw-space-y-2.5">
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <div
                // eslint-disable-next-line react/jsx-curly-brace-presence
                className={`naxatw-bg-[#0076FF] naxatw-w-2 naxatw-h-2 naxatw-rounded-full`}
              />
              <p className={` naxatw-capitalize naxatw-text-body-lg `}>
                Ongoing
              </p>
              <h5>{organizationDetails?.ongoing}</h5>
            </div>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <div
                // eslint-disable-next-line react/jsx-curly-brace-presence
                className={`naxatw-bg-[#40B449] naxatw-w-2 naxatw-h-2 naxatw-rounded-full`}
              />
              <p className={` naxatw-capitalize naxatw-text-body-lg `}>
                Completed
              </p>
              <h5>{organizationDetails?.completed}</h5>
            </div>
          </div>
          <div className="naxatw-flex naxatw-w-full md:naxatw-w-[calc(100vw-51rem)] md:naxatw-max-w-[450px]">
            <div
              style={{
                width: `${getWidth(
                  organizationDetails?.ongoing,
                  organizationDetails?.projects,
                )}%`,
              }}
              className="naxatw-h-[20px] naxatw-bg-[#0076FF] naxatw-rounded-l-md naxatw-rounded-r-md"
            />
            <div
              style={{
                width: `${getWidth(
                  organizationDetails?.completed,
                  organizationDetails?.projects,
                )}%`,
              }}
              className="naxatw-h-[20px] naxatw-bg-[#40B449] naxatw-rounded-r-md"
            />
          </div>
        </div>
        {/* Organization Description */}
        <div className="naxatw-p-7 ">
          <div className="naxatw-space-y-2.5">
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <span className="naxatw-text-body-md naxatw-w-[160px]">
                Organization Size
              </span>
              <span className="naxatw-text-body-lg naxatw-font-bold">
                {organizationDetails?.size || 'N/A'}
              </span>
            </div>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <span className="naxatw-text-body-md naxatw-w-[160px]">
                Thematic focus areas
              </span>
              <span className="naxatw-text-body-lg naxatw-font-bold">
                {organizationDetails?.thematic_areas?.join(', ') || 'N/A'}
              </span>
            </div>
          </div>
          <div className="naxatw-mt-7">
            <h4>About</h4>
            <p className="naxatw-text-body-lg naxatw-mt-2">
              {organizationDetails?.description || 'N/A'}
            </p>
          </div>
          <div className="naxatw-mt-7">
            <h4 className="naxatw-mb-3">Focal Contact Person</h4>
            {organizationDetails?.contact_person?.length > 0 ? (
              organizationDetails?.contact_person?.map(person => (
                <div>
                  <p className="naxatw-text-body-btn naxatw-mb-1">
                    {person.name}
                  </p>
                  <p className="naxatw-text-body-lg">{person.email}</p>
                </div>
              ))
            ) : (
              <span className="naxatw-text-body-lg">N/A</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
