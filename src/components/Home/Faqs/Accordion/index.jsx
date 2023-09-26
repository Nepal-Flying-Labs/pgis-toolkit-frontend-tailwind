import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function FaqAccordion({
  collapsed: isCollapsed,
  header,
  body,
  className,
  onToggle,
  description,
  disableHeaderClickToggle,
}) {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  console.log(body);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  return (
    <div
      className={`naxatw-border-b-[1px] naxatw-p-2
        naxatw-pb-3 naxatw-border-grey-300 ${className}`}
    >
      <div className="naxatw-pl-2">
        <div
          className="naxatw-flex naxatw-items-center naxatw-justify-between
            naxatw-w-full naxatw-font-bold naxatw-gap-3 naxatw-cursor-pointer"
          onClick={() => {
            if (disableHeaderClickToggle) return;
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
                !collapsed ? '' : 'hover:naxatw-bg-grey-100'
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
      <div
        className={`${
          collapsed
            ? 'naxatw-hidden'
            : ' naxatw-px-2 naxatw-leading-[22px] naxatw-font-normal naxatw-text-[#484848] naxatw-mt-2'
        }`}
      >
        {body}
      </div>
    </div>
  );
}

FaqAccordion.defaultProps = {
  collapsed: false,
  header: '',
  body: '',
  className: '',
  onToggle: () => {},
  description: '',
  disableHeaderClickToggle: false,
};

FaqAccordion.propTypes = {
  collapsed: PropTypes.bool,
  header: PropTypes.node,
  className: PropTypes.string,
  body: PropTypes.node,
  onToggle: PropTypes.func,
  description: PropTypes.node,
  disableHeaderClickToggle: PropTypes.bool,
};
