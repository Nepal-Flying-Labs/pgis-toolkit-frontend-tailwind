/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const Checkbox = ({
  id,
  label,
  onClick,
  checked,
  disabled,
  className,
  labelClassName,
}) => {
  return (
    <div
      className={`${className} naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-px-2 naxatw-py-3 naxatw-w-full`}
    >
      <div className="naxatw-p-1 naxatw-w-6 naxatw-h-6  naxatw-flex naxatw-items-center naxatw-justify-center">
        <input
          id={id}
          type="checkbox"
          className={` naxatw-min-h-[1rem] naxatw-min-w-[1rem] naxatw-accent-grey-800  ${className}`}
          onChange={onClick}
          checked={checked}
          disabled={disabled}
        />
      </div>

      <label
        htmlFor={id}
        className={`naxatw-text-body-lg naxatw-text-[#484848] naxatw-block naxatw-w-full ${labelClassName}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
