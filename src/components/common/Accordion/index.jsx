import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion({
  collapsed: isCollapsed,
  header,
  body,
  className,
  onToggle,
  description,
}) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div
      className={`naxatw-bg-white naxatw-border naxatw-rounded-lg naxatw-p-2
        naxatw-pb-3 naxatw-border-grey-300 ${className} hover:naxatw-border-grey-800`}
    >
      <div className="naxatw-pl-2">
        <div
          className="naxatw-flex naxatw-items-center naxatw-justify-between
          naxatw-w-full naxatw-font-medium naxatw-gap-3"
          onClick={() => {
            setCollapsed(!collapsed);
            onToggle(collapsed);
          }}
        >
          {header}
          <span className="naxatw-flex naxatw-w-9 naxatw-h-9">
            <button
              type="button"
              className={`naxatw-rounded-lg naxatw-p-1.5 ${
                !collapsed
                  ? 'naxatw-bg-primary-50 naxatw-text-primary-500'
                  : 'hover:naxatw-bg-grey-100'
              }`}
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
        <div>{description}</div>
      </div>
      <div className={`${collapsed ? 'naxatw-hidden' : ''}`}>{body}</div>
    </div>
  );
}

Accordion.defaultProps = {
  collapsed: false,
  header: '',
  body: '',
  className: '',
  onToggle: () => {},
  description: '',
};

Accordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  className: PropTypes.string,
  body: PropTypes.node,
  onToggle: PropTypes.func,
  description: PropTypes.node,
};
