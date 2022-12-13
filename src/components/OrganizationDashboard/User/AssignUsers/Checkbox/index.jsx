/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const Checkbox = ({ id, label }) => {
  return (
    <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
      <input id={id} type="checkbox" className="naxatw-h-5 naxatw-w-5" />

      <label htmlFor={id} className="naxatw-text-body-lg naxatw-text-[#484848]">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
