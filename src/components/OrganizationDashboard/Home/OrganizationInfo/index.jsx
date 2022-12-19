/* eslint-disable arrow-body-style */
import React from 'react';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import AvatarImage from '@Assets/images/user-avatar.png';
import ProjectIcon from '@Assets/images/project-icon.png';

const OrganizationInfo = () => {
  return (
    <div className="naxatw-w-full naxatw-bg-white naxatw-rounded-xl naxatw-h-full naxatw-border naxatw-border-[#D7D7D7]">
      {/* Header */}
      <div className="naxatw-p-7  naxatw-rounded-t-lg naxatw-flex naxatw-gap-x-5">
        <div className="naxatw-w-[60px] naxatw-h-[60px] naxatw-rounded-full">
          <img
            src={AvatarImage}
            alt="organization-img"
            className="naxatw-w-[60px] naxatw-h-[60px] naxatw-rounded-full"
          />
        </div>
        <div>
          <h3>World Bicycle Relief</h3>
          <p className="naxatw-mt-[4px] naxatw-text-body-lg">
            23 Saint Street, Columbia, North America
          </p>
          <div className="naxatw-mt-5 naxatw-flex naxatw-gap-x-7">
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <MaterialIcon
                name="phone"
                className="naxatw-text-icon-md naxatw-text-primary-400 "
              />
              <span className="naxatw-text-body-lg">+61 920 2973 99</span>
            </div>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <MaterialIcon
                name="mail_outline"
                className="naxatw-text-icon-md naxatw-text-primary-400"
              />
              <span className="naxatw-text-body-lg">email@gmail.com</span>
            </div>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <MaterialIcon
                name="language"
                className="naxatw-text-icon-md naxatw-text-primary-400"
              />
              <span className="naxatw-text-body-lg">
                www.worldbicyclereleif.com
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Project Description */}
      <div className="naxatw-bg-[#F5F5F5] naxatw-p-7 naxatw-flex naxatw-gap-x-5 naxatw-items-center naxatw-justify-between">
        <div className="naxatw-flex naxatw-gap-x-5 ">
          <img
            className="naxatw-w-[60px] naxatw-h-[60px] naxatw-py-[3px]"
            alt="project-icon"
            src={ProjectIcon}
          />
          <div>
            <h5>Projects</h5>
            <h3>47</h3>
          </div>
        </div>
        <div className="naxatw-space-y-2.5">
          <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
            <div
              // eslint-disable-next-line react/jsx-curly-brace-presence
              className={`naxatw-bg-[#0076FF] naxatw-w-2 naxatw-h-2 naxatw-rounded-full`}
            />
            <p className={` naxatw-capitalize naxatw-text-body-md `}>Ongoing</p>
            <h5>32</h5>
          </div>
          <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
            <div
              // eslint-disable-next-line react/jsx-curly-brace-presence
              className={`naxatw-bg-[#40B449] naxatw-w-2 naxatw-h-2 naxatw-rounded-full`}
            />
            <p className={` naxatw-capitalize naxatw-text-body-md `}>
              Completed
            </p>
            <h5>19</h5>
          </div>
        </div>

        <div className="naxatw-flex naxatw-w-[450px]">
          <div
            style={{ width: '40%' }}
            className="naxatw-h-[20px] naxatw-bg-[#0076FF] naxatw-rounded-l-md"
          />
          <div
            style={{ width: '60%' }}
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
            <span className="naxatw-text-body-lg">200+</span>
          </div>
          <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
            <span className="naxatw-text-body-md naxatw-w-[160px]">
              Thematic focus areas
            </span>
            <span className="naxatw-text-body-lg">
              Climate change and energy, Ecosystem services, Planetary Health,
              Sustainable Development
            </span>
          </div>
        </div>
        <div className="naxatw-mt-7">
          <h4>About</h4>
          <p className="naxatw-text-body-lg naxatw-mt-2">
            World Bicycle Relief is an international, non-profit organization
            based in Chicago, IL that specializes in large-scale, comprehensive
            bicycle distribution programs to aid poverty relief in developing
            countries around the world. Their programs focus primarily on
            education, economic development, and health care. We specializes in
            large-scale, comprehensive bicycle distribution programs to aid
            poverty relief in developing countries around the world. Their
            programs focus primarily on education, economic development, and
            health care. World Bicycle Relief is an international, non-profit
            organization based in Chicago, IL that specializes in large-scale,
            comprehensive bicycle distribution programs to aid poverty relief in
            developing countries around the world. Their programs focus
            primarily on education, economic development, and health care. We
            specializes in large-scale, comprehensive bicycle distribution
            programs to aid poverty relief in developing countries around the
            world. Their programs focus primarily on education, economic
            development, and health care.
          </p>
        </div>
        <div className="naxatw-mt-7">
          <h4 className="naxatw-mb-3">Focal Contact Person</h4>
          <p className="naxatw-text-body-btn naxatw-mb-1">Harry Smith</p>
          <p className="naxatw-text-body-lg">harry_smith@mail.com</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
