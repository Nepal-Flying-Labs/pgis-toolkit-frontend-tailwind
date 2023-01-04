import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion({
  collapsed: isCollapsed,
  header,
  body,
  className,
}) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div
      className={`naxatw-bg-white naxatw-border naxatw-rounded-lg naxatw-p-5 naxatw-border-grey-300 ${className}`}
    >
      <div className=" naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full naxatw-font-medium naxatw-gap-3">
        {header}
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
      </div>
      <div className={`${collapsed ? 'naxatw-hidden' : ''}`}>
        <div className="naxatw-font-light">{body}</div>
      </div>
    </div>
  );
}

Accordion.defaultProps = {
  collapsed: false,
  header: '',
  body: '',
  className: '',
};

Accordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  className: PropTypes.string,
  body: PropTypes.node,
};
