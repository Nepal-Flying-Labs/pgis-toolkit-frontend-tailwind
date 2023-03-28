import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion({
  collapsed: isCollapsed,
  header,
  body,
  className,
  onToggle,
}) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div
      className={`naxatw-bg-white naxatw-border naxatw-rounded-lg naxatw-p-2
        naxatw-pb-3 naxatw-border-grey-300 ${className}`}
    >
      <div
        className="naxatw-flex naxatw-items-center naxatw-justify-between
          naxatw-w-full naxatw-font-medium naxatw-gap-3 naxatw-pl-2"
      >
        <div
          onClick={() => {
            setCollapsed(!collapsed);
            onToggle(collapsed);
          }}
        >
          {header}
        </div>
        <span className="naxatw-flex naxatw-w-9 naxatw-h-9">
          <button
            type="button"
            className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg
              naxatw-p-1.5"
            onClick={() => {
              setCollapsed(!collapsed);
              onToggle(collapsed);
            }}
          >
            <i className="material-icons naxatw-text-icon-md">
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
  onToggle: () => {},
};

Accordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  className: PropTypes.string,
  body: PropTypes.node,
  onToggle: PropTypes.func,
};
