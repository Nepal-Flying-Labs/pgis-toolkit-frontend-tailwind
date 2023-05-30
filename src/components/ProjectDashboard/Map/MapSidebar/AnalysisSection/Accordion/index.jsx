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
    <div className={`naxatw-rounded-lg naxatw-p-2 naxatw-pb-3 ${className}`}>
      <div className="naxatw-pl-2">
        <div
          className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-py-1
            naxatw-w-full naxatw-font-medium naxatw-gap-3 naxatw-cursor-pointer"
          onClick={() => {
            setCollapsed(!collapsed);
            onToggle(collapsed);
          }}
        >
          {header}
          <span className="naxatw-flex naxatw-w-9 naxatw-h-9">
            <button
              type="button"
              title={collapsed ? 'Expand' : 'Collapse'}
              className={`naxatw-rounded-lg naxatw-p-1.5 ${
                !collapsed ? '' : ''
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
