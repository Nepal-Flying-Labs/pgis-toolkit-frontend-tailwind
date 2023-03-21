import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomNumberInput = ({ max, min, onChange }) => {
  const [value, setValue] = useState(1);
  const handleMinus = () => {
    if (value > min) setValue(prev => Number(prev) - 1);
  };
  const handlePlus = () => {
    if (value < max) {
      setValue(prev => Number(prev) + 1);
    }
  };

  // const handleChange = e => {
  //   const { value: num } = e.target;
  //   if ((num >= min && num <= max) || Number(num) === 0) {
  //     setValue(num);
  //   }
  // };

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);
  return (
    <div className="naxatw-flex naxatw-bg-white naxatw-border naxatw-border-grey-400 naxatw-rounded-md naxatw-w-fit">
      <span
        className="naxatw-w-10 naxatw-h-10 naxatw-rounded-md  naxatw-cursor-pointer naxatw-flex naxatw-items-center 
                    naxatw-justify-center hover:naxatw-bg-grey-100 naxatw-text-[24px] naxatw-select-none"
        onClick={handleMinus}
      >
        -
      </span>
      <input
        type="text"
        className="naxatw-px-3 naxatw-bg-white naxatw-h-10 !naxatw-w-10 focus:naxatw-outline-none"
        value={value}
        // onChange={e => handleChange(e)}
        // onKeyUp={e => handleKeyUp(e)}
        // onKeyDown={e => handleKeyDown(e)}
      />
      <span
        className="naxatw-w-10 naxatw-h-10 naxatw-rounded-md  naxatw-cursor-pointer naxatw-flex 
                    naxatw-items-center naxatw-justify-center hover:naxatw-bg-grey-100 naxatw-text-[24px] naxatw-select-none"
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
