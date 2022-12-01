/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import './MultiSelectDropdown.css';

const Chip = ({ name, onClick, status }) => {
  const [activeChip, setActiveChip] = useState(false);

  useEffect(() => {
    if (Array.isArray(status)) {
      if (status.includes(name)) {
        return setActiveChip(true);
      }
    } else if (status === name) {
      return setActiveChip(true);
    }

    return setActiveChip(false);
  }, [name, status]);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={`naxatw-px-5 naxatw-py-2.5 naxatw-rounded-3xl naxatw-border ${
        activeChip
          ? ' naxatw-border-[#484848] naxatw-bg-[#F5F5F5]'
          : 'naxatw-border-[#D7D7D7]'
      }`}
    >
      <span className="naxatw-text-body-lg">{name}</span>
    </div>
  );
};
Chip.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onClick: PropTypes.func,
};

Chip.defaultProps = {
  onClick: () => {},
};

export default Chip;
