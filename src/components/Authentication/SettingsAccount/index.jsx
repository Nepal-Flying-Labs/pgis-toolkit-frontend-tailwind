import React, { useState } from 'react';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import ProfileSettings from './ProfileSettings';
// import NotificationSettings from './NotificationSettings';
import PasswordSettings from './PasswordSettings';

const linkOptions = [
  {
    id: 1,
    name: 'Profile',
    icon: 'person',
  },
  // {
  //   id: 2,
  //   name: 'Notification',
  //   icon: 'notifications',
  // },
  {
    id: 3,
    name: 'Password',
    icon: 'lock',
  },
];

function Settings() {
  const [active, setActive] = useState(1);

  const getContent = step => {
    switch (step) {
      case 1:
        return <ProfileSettings />;
      // case 2:
      //   return <NotificationSettings />;
      case 3:
        return <PasswordSettings />;
      default:
        return '';
    }
  };
  return (
    <div className="naxatw-flex">
      <div className="naxatw-rounded-xl naxatw-border naxatw-py-3 naxatw-h-fit md:naxatw-min-w-[325px] md:naxatw-w-[325px] naxatw-mr-5">
        <ul>
          {linkOptions.map(link => (
            <li
              key={link.id}
              className={`naxatw-p-4 naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center hover:naxatw-bg-grey-100 naxatw-cursor-pointer  ${
                active === link.id ? 'naxatw-bg-grey-100' : ''
              } `}
              role="presentation"
              onClick={() => setActive(link.id)}
            >
              <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
                <MaterialIcon
                  name={link.icon}
                  className={`${
                    active === link.id
                      ? 'naxatw-text-primary-400'
                      : 'naxatw-text-grey-600'
                  }`}
                />
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
      <div className="naxatw-w-full">{getContent(active)}</div>
    </div>
  );
}

export default Settings;
