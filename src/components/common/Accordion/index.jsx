import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Accordion({ collapsed: isCollapsed, header, body }) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div className="naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-lg">
      <div className="naxatw-p-5 naxatw-flex naxatw-items-start naxatw-justify-between naxatw-w-full naxatw-font-medium naxatw-gap-3">
        {header}
        <span className="naxatw-flex">
          <button
            type="button"
            className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg"
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg
              className="naxatw-w-6 naxatw-h-6 naxatw-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      <div className={`${collapsed ? 'naxatw-hidden' : ''}`}>
        <div className="naxatw-p-5 naxatw-font-light naxatw-border naxatw-border-t-0 naxatw-border-gray-200">
          {body}
        </div>
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
