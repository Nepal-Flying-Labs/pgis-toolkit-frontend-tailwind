/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const Checkbox = ({ id, label, onClick, checked, disabled, className }) => {
  return (
    <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
      <input
        id={id}
        type="checkbox"
        className={`naxatw-h-5 naxatw-w-5 ${className}`}
        onChange={onClick}
        checked={checked}
        disabled={disabled}
      />

      <label htmlFor={id} className="naxatw-text-body-lg naxatw-text-[#484848]">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
