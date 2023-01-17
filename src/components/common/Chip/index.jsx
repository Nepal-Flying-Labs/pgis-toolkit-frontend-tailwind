/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import './MultiSelectDropdown.css';

const Chip = ({
  name,
  onClick,
  status,
  value,
  iconRight,
  onIconClick,
  isSmall,
}) => {
  const [activeChip, setActiveChip] = useState(false);

  useEffect(() => {
    if (Array.isArray(status)) {
      if (status.includes(value)) {
        return setActiveChip(true);
      }
    } else if (status === value) {
      return setActiveChip(true);
    }

    return setActiveChip(false);
  }, [name, status, value]);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={`naxatw-px-5 ${
        isSmall ? 'naxatw-py-[0.462rem]' : 'naxatw-py-2.5'
      } naxatw-w-fit hover:naxatw-bg-[#F5F5F5] naxatw-bg-white
        naxatw-rounded-3xl naxatw-border naxatw-flex naxatw-items-center ${
          activeChip
            ? ' naxatw-border-[#484848] naxatw-bg-[#F5F5F5]'
            : 'naxatw-border-[#D7D7D7]'
        }`}
    >
      <span className="naxatw-text-body-lg">{name}</span>

      {iconRight && (
        <i
          role="button"
          tabIndex="0"
          onClick={onIconClick}
          className="material-icons naxatw-mr-2 naxatw-text-[22px]"
        >
          {iconRight}
        </i>
      )}
    </div>
  );
};
Chip.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  onIconClick: PropTypes.func,
  iconRight: PropTypes.string,
  isSmall: PropTypes.bool,
};

Chip.defaultProps = {
  onClick: () => {},
  onIconClick: () => {},
  iconRight: null,
  isSmall: false,
};

export default Chip;
