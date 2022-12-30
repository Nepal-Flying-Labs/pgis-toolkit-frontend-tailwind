import CustomCheckbox from '@Components/common/CustomCheckbox/index';
import CustomRadio from '@Components/common/CustomRadioInput/index';
import { isEmpty } from '@Utils/commonUtils';
import React, { useState } from 'react';

const radioOptions = [
  {
    id: 1,
    name: 'All new messages',
  },
  {
    id: 2,
    name: 'Direct messages, mentions & keywords',
  },
  {
    id: 3,
    name: 'Nothing',
  },
];

const notifyMe = [
  {
    id: 1,
    name: 'Notify me when a huddle starts in one of my channels',
  },
  {
    id: 2,
    name: `Notify me about replies to threads I'm following`,
  },
];

function NotificationSettings() {
  const [activeRadio, setActiveRadio] = useState(1);
  const [notify, setNotify] = useState([]);
  const [sendEmail, setSendEmail] = useState(false);

  const handleNotify = id => {
    if (!isEmpty(notify) && notify.includes(id)) {
      const list = notify.filter(d => d !== id);
      return setNotify(list);
    }
    return setNotify([...notify, id]);
  };

  return (
    <div className="naxatw-container naxatw-mx-auto naxatw-space-y-2">
      <div className="naxatw-space-y-2 naxatw-pr-5">
        <p className="naxatw-text-body-btn">Notify me about…</p>
        {radioOptions.map(item => (
          <div
            role="presentation"
            onClick={() => setActiveRadio(item.id)}
            className="naxatw-flex naxatw-gap-x-2 naxatw-items-center"
            key={item.id}
          >
            <CustomRadio
              status={item.id === activeRadio}
              iconClassName="naxatw-bg-[#00A699]"
              wrapperClassName="!naxatw-border-[#00A699]"
            />
            <span className="naxatw-text-body-lg">{item.name}</span>
          </div>
        ))}
        <div className="naxatw-border naxatw-bg-grey-300" />
      </div>

      <div className="naxatw-space-y-2 naxatw-pr-5">
        {notifyMe.map(item => (
          <div
            role="presentation"
            onClick={() => handleNotify(item.id)}
            key={item.id}
            className="naxatw-flex naxatw-gap-x-2 naxatw-items-center"
          >
            <CustomCheckbox
              status={!isEmpty(notify) && notify.includes(item.id)}
              activeClassName="naxatw-bg-[#00A699] !naxatw-border-[#00A699]"
            />
            <span className="naxatw-text-body-lg">{item.name}</span>
          </div>
        ))}
        {/* <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
          <CustomCheckbox
            status
            activeClassName="naxatw-bg-[#00A699] !naxatw-border-[#00A699]"
          />
          <span className="naxatw-text-body-lg">
            Notify me about replies to threads I'm following
          </span>
        </div> */}
        <div className="naxatw-border naxatw-bg-grey-300" />
      </div>

      <div className="naxatw-space-y-2 naxatw-pr-5">
        <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
          <CustomCheckbox
            onClick={() => setSendEmail(!sendEmail)}
            status={sendEmail}
            activeClassName="naxatw-bg-[#00A699] !naxatw-border-[#00A699]"
          />
          <span className="naxatw-text-body-lg">
            Send me email notifications for mentions and direct messages
          </span>
        </div>
        <div className="naxatw-border naxatw-bg-grey-300" />
      </div>
    </div>
  );
}

export default NotificationSettings;
