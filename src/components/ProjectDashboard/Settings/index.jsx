/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import MaterialIcon from '@Components/common/MaterialIcon';
import BasicInfo from '@Components/OrganizationDashboard/ProjectSetup/FormPages/BasicInfo';
import Location from '@Components/OrganizationDashboard/ProjectSetup/FormPages/Location';
// import ProjectSetup from '@Components/OrganizationDashboard/ProjectSetup/index';

const linkOptions = [
  {
    id: 1,
    name: 'Basic Info',
  },
  {
    id: 2,
    name: 'Location',
  },
];

export default function Settings() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div className="naxatw-container naxatw-mx-auto naxatw-pt-3 naxatw-flex naxatw-gap-x-5 naxatw-h-[calc(100vh-60px)]">
        <div className="">
          <div className="naxatw-rounded-xl naxatw-border naxatw-py-3 fl md:naxatw-w-[325px]">
            <ul>
              {linkOptions.map(link => (
                <li
                  key={link.id}
                  onClick={() => setActive(link.id)}
                  className={`naxatw-p-4 naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center hover:naxatw-bg-grey-100 naxatw-cursor-pointer  ${
                    active === link.id ? 'naxatw-bg-grey-100' : ''
                  } `}
                >
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
                    <span
                      className={`naxatw-text-[13px] naxatw-font-bold ${
                        active === link.id
                          ? 'naxatw-text-primary-400'
                          : 'naxatw-text-grey-600'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>

                  {active === link.id && (
                    <MaterialIcon
                      name="chevron_right"
                      className="naxatw-text-icon-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" naxatw-overflow-y-auto scrollbar naxatw-p-7 naxatw-w-full">
          {active === 1 && (
            <div className="naxatw-space-y-7">
              <h3>Basic Info</h3>
              <BasicInfo />
            </div>
          )}

          {active === 2 && (
            <div className="naxatw-space-y-7">
              <h3>Location</h3>
              <Location />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
