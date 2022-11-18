import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SortingContainer({ name, handleSort }) {
  const [iconChange, setIconChange] = useState(false);
  const toggleIcon = () => {
    handleSort();
    setIconChange(!iconChange);
  };
  return (
    <div className="naxatw-flex naxatw-items-center">
      <span className="naxatw-font-bold naxatw-text-grey-500 naxatw-text-sm">
        {name}
      </span>
      <span className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center">
        <i
          role="button"
          className="material-icons"
          onKeyUp={() => toggleIcon()}
          onClick={() => toggleIcon()}
          tabIndex={0}
        >
          {iconChange ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </i>
      </span>
    </div>
  );
}

SortingContainer.propTypes = {
  name: PropTypes.string,
  handleSort: PropTypes.func,
};

SortingContainer.defaultProps = {
  name: '',
  handleSort: () => {},
};
