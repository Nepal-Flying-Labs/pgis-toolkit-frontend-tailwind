import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function CustomAccordion({
  collapsed: isCollapsed,
  header,
  body,
}) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div className="naxatw-bg-white naxatw-p-[10px] naxatw-border-t-[1px] naxatw-border-b-[1px] naxatw-border-grey-300">
      <div className=" naxatw-flex naxatw-items-center naxatw-w-full naxatw-font-medium naxatw-gap-3">
        <span className="naxatw-flex">
          <button
            type="button"
            className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="material-icons">
              {collapsed ? 'expand_more' : 'expand_less'}
            </i>
          </button>
        </span>
        {header}
      </div>
      <div className={`${collapsed ? 'naxatw-hidden' : ''}`}>
        <div className="naxatw-font-light">{body}</div>
      </div>
    </div>
  );
}

CustomAccordion.defaultProps = {
  collapsed: false,
  header: '',
  body: '',
};

CustomAccordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  body: PropTypes.node,
};
