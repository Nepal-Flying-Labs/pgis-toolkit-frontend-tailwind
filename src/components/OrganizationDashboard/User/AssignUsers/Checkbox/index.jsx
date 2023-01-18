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
      <input
        id={id}
        type="checkbox"
        className={`naxatw-h-5 naxatw-w-5 naxatw-accent-grey-800 ${className}`}
        onChange={onClick}
        checked={checked}
        disabled={disabled}
      />

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
