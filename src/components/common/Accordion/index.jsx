import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion({ collapsed: isCollapsed, header, body }) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div className="naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-lg naxatw-p-5">
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
};

Accordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  body: PropTypes.node,
};
