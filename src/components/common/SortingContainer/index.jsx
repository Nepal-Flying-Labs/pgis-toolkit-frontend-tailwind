import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SortingContainer({
  name,
  handleSort,
  className,
  isActive,
}) {
  const [iconChange, setIconChange] = useState(isActive);
  const toggleIcon = () => {
    handleSort();
    setIconChange(!iconChange);
  };
  return (
    <div className="naxatw-flex naxatw-items-center naxatw-gap-x-1">
      <span
        className={`naxatw-font-bold ${className} ${
          isActive ? 'naxatw-text-grey-800' : 'naxatw-text-grey-500'
        } naxatw-text-body-sm`}
      >
        {name}
      </span>
      <span className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center">
        <i
          role="button"
          className={`material-icons ${
            isActive ? 'naxatw-text-grey-800' : 'naxatw-text-grey-500'
          } naxatw-text-icon-md`}
          onKeyUp={() => toggleIcon()}
          onClick={() => toggleIcon()}
          tabIndex={0}
        >
          {iconChange ? 'keyboard_arrow_down' : 'unfold_more'}
        </i>
      </span>
    </div>
  );
}

SortingContainer.propTypes = {
  name: PropTypes.string,
  handleSort: PropTypes.func,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

SortingContainer.defaultProps = {
  name: '',
  className: '',
  handleSort: () => {},
  isActive: false,
};
