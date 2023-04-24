import React from 'react';
import PropTypes from 'prop-types';

export default function RangeSlider({
  label,
  name,
  value,
  onChange,
  min,
  max,
}) {
  return (
    <div className="naxatw-flex naxatw-items-center">
      <div className="naxatw-w-full naxatw-space-y-2">
        <label className="naxatw-label">{label}</label>
        <div className="naxatw-flex naxatw-gap-4">
          <input
            name={name}
            type="number"
            min={min}
            max={max}
            className="naxatw-input naxatw-w-20"
            value={value}
            onChange={onChange}
          />
          <input
            type="range"
            className="naxatw-input naxatw-h-12 naxatw-w-32 naxatw-p-[3px]"
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

RangeSlider.defaultProps = {
  value: '',
  onChange: () => {},
  min: 0,
  max: 100,
};

RangeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
