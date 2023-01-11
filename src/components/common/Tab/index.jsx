import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function Tab({ data, activeId, contentClassName }) {
  const [activeTabId, setActiveTabId] = useState(data[0]?.id || null);

  useEffect(() => {
    if (!activeId) return;
    setActiveTabId(activeId);
  }, [activeId]);

  const getTabContent = useCallback(
    selected => data.find(item => item.id === selected)?.content || '',
    [data],
  );

  return (
    <div className="naxatw-h-full">
      <ul className="naxatw-flex naxatw-flex-wrap naxatw--mb-px">
        {data.map(({ id, title, disabled }) => (
          <li
            role="tab"
            key={id}
            className="naxatw-mr-2"
            onClick={() => {
              if (disabled) return;
              setActiveTabId(id);
            }}
          >
            <a
              className={`naxatw-inline-block naxatw-px-3 naxatw-py-2 naxatw-border-b-2
                naxatw-border-transparent naxatw-rounded-t-lg naxatw-text-body-btn ${
                  activeTabId === id
                    ? 'naxatw-text-grey-800 naxatw-border-b-grey-800'
                    : 'naxatw-text-grey-500 hover:naxatw-border-grey-300 hover:naxatw-text-grey-600 '
                } ${disabled ? 'naxatw-cursor-not-allowed' : ''}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
      <div className={`naxatw-pt-3 ${contentClassName}`}>
        {getTabContent(activeTabId)}
      </div>
    </div>
  );
}

Tab.defaultProps = {
  activeId: null,
  contentClassName: '',
};

Tab.propTypes = {
  data: PropTypes.array.isRequired,
  activeId: PropTypes.number,
  contentClassName: PropTypes.string,
};
