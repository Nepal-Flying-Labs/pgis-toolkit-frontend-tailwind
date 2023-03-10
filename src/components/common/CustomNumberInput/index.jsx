import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomNumberInput = ({ max, min, onChange }) => {
  const [value, setValue] = useState(1);
  const handleMinus = () => {
    if (value > min) setValue(prev => prev - 1);
  };
  const handlePlus = () => {
    if (value < max) {
      setValue(prev => prev + 1);
    }
  };
  useEffect(() => {
    onChange(value);
  }, [onChange, value]);
  return (
    <div className="naxatw-flex naxatw-gap-3">
      <span
        className="naxatw-w-10 naxatw-h-10 naxatw-rounded-md naxatw-border naxatw-cursor-pointer naxatw-flex naxatw-items-center naxatw-justify-center naxatw-bg-grey-100"
        onClick={handleMinus}
      >
        -
      </span>
      <input
        type="text"
        className="naxatw-input !naxatw-h-10 !naxatw-w-10"
        value={value}
        onChange={onChange}
      />
      <span
        className="naxatw-w-10 naxatw-h-10 naxatw-rounded-md naxatw-border naxatw-cursor-pointer naxatw-flex naxatw-items-center naxatw-justify-center naxatw-bg-grey-100"
        onClick={handlePlus}
      >
        +
      </span>
    </div>
  );
};

export default CustomNumberInput;

CustomNumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

CustomNumberInput.defaultProps = {
  min: 1,
  max: 5,
  onChange: () => {},
};
