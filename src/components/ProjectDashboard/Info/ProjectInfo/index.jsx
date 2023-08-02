/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import noImg from '@Assets/images/noImage.png';
import { isEmpty } from '@Utils/commonUtils';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import 'react-image-lightbox/style.css';

const tabsData = [
  { label: 'Map', route: 'map' },
  { label: 'Data', route: 'data' },
  { label: 'Documents', route: 'document' },
  { label: 'Gallery', route: 'gallery' },
  { label: 'Users', route: 'users' },
  { label: 'Settings', route: 'settings' },
];

const ProjectInfo = () => {
  const info = useSelector(state => state.projectDashboard.info.details);
  const contactPerson = useSelector(
    state => state.projectDashboard.contactPerson,
  );
  const [open, setOpen] = useState(false);

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return '#0076FF';
      case 'proposal':
        return '#F49506';
      case 'completed':
        return '#31A53A';
      default:
        return '';
    }
  };

  return (
    <div
      className="naxatw-w-full naxatw-bg-white naxatw-rounded-[20px] naxatw-h-full naxatw-overflow-y-auto
        scrollbar naxatw-border naxatw-border-grey-300 naxatw-mb-5 md:naxatw-mb-0 naxatw-flex naxatw-justify-between"
    >
      {/* Header */}
      <div className="naxatw-p-7 naxatw-rounded-t-lg xl:naxatw-flex naxatw-w-full">
        <div className="naxatw-w-full xl:naxatw-w-3/4 naxatw-pr-5">
          <h3 className="naxatw-mb-2">{info?.name || '-'}</h3>
          <div className="naxatw-flex naxatw-mb-5">
            <span className="naxatw-text-body-md naxatw-mr-1">
              {info?.start_date || '-'}
            </span>
            <span className="naxatw-mr-1">-</span>
            <span className="naxatw-text-body-md naxatw-mr-2">
              {info?.end_date || '-'}
            </span>
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
              <div
                style={{
                  backgroundColor: `${getStatusColor(info?.status || '')}`,
                }}
                className="naxatw-w-2 naxatw-h-2 naxatw-rounded-full"
              />
              <p
                style={{ color: `${getStatusColor(info?.status || '')}` }}
                className={` naxatw-capitalize naxatw-text-body-md `}
              >
                {info?.status || '-'}
              </p>
            </div>
          </div>
          <div className="naxatw-mb-3">
            <p className="naxatw-text-body-btn naxatw-mb-1">
              Thematic focus areas
            </p>
            <p className="naxatw-text-body-lg">
              {info?.thematic_areas?.map(area => <li>{area}</li>) || '-'}
            </p>
          </div>
          <div className="">
            <p className="naxatw-text-body-btn naxatw-mb-1">Project partners</p>
            <p className="naxatw-text-body-lg">
              {info?.partners?.map(partner => <li>{partner.value}</li>) || '-'}
            </p>
          </div>

          {/* Project objectives */}
          <div className="naxatw-pt-8 naxatw-mb-7">
            <h4 className="naxatw-mb-2 naxatw-font-semibold">Objectives</h4>
            <p className="naxatw-text-body-lg naxatw-text-justify">
              {info?.description || '-'}
            </p>
          </div>

          {/* contact person */}
          <div className="naxatw-pb-5">
            <h4 className="naxatw-mb-3 naxatw-font-semibold">
              Contact person{' '}
            </h4>
            {!isEmpty(contactPerson) ? (
              contactPerson?.map(item => (
                <div className="naxatw-mb-5" key={item.id}>
                  <p className="naxatw-text-body-btn naxatw-mb-1">
                    {item?.name || '-'}
                  </p>
                  <p className="naxatw-text-body-lg naxatw-mb-2">
                    {item?.position || '-'}
                  </p>
                  <div className="xl:naxatw-gap-7 naxatw-gap-2 naxatw-flex naxatw-flex-col xl:naxatw-flex-row">
                    <div className="naxatw-gap-x-2 naxatw-flex">
                      <MaterialIcon
                        name="call"
                        className="naxatw-text-[#FF5A5F]"
                        title="Phone"
                      />
                      <span className="naxatw-text-body-lg">
                        {item?.contact || '-'}
                      </span>
                    </div>
                    <div className="naxatw-gap-x-2 naxatw-flex">
                      <MaterialIcon
                        name="mail_outline"
                        className="naxatw-text-[#FF5A5F]"
                        title="Email"
                      />
                      <span className="naxatw-text-body-lg">
                        {item?.email || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="naxatw-text-body-lg">N/A</div>
            )}
          </div>
        </div>
        <div
          className="naxatw-pt-2.5 naxatw-flex naxatw-justify-center xl:naxatw-mt-0 xl:naxatw-block naxatw-cursor-default"
          role="button"
          onKeyDown={() => {}}
          tabIndex="0"
          onClick={() => setOpen(true)}
        >
          <img
            className="naxatw-rounded-lg naxatw-h-[195px] naxatw-w-[297px] naxatw-border naxatw-border-grey-300
              naxatw-object-cover naxatw-cursor-pointer"
            src={info?.cover_image || noImg}
            alt=""
          />
          {open && (
            <Lightbox
              mainSrc={info?.cover_image}
              enableZoom
              onCloseRequest={() => setOpen(false)}
              reactModalStyle={{ overlay: { zIndex: '999999999' } }}
            />
          )}

          <div
            className="naxatw-flex naxatw-flex-col naxatw-justify-end xl:naxatw-mt-14 naxatw-text-grey-800 
             naxatw-bg-grey-100 naxatw-rounded-md naxatw-w-fit naxatw-ml-auto naxatw-pr-6 naxatw-pl-5 naxatw-py-3"
          >
            <h4 className="naxatw-py-1.5">Navigation</h4>
            {tabsData.map(({ label, route }) => (
              <Link
                className="naxatw-flex naxatw-justify-end hover:naxatw-text-secondary-400 naxatw-cursor-pointer 
                  naxatw-text-body-lg naxatw-font-[600] naxatw-py-1.5"
                to={route}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
