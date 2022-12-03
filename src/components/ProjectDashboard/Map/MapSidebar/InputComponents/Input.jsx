import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ label, type, name, value, onChange }) {
  return (
    <div className="naxatw-flex naxatw-items-center">
      <div className="naxatw-w-full naxatw-space-y-2">
        <label className="naxatw-label">{label}</label>
        <input
          type={type}
          className={`naxatw-input ${
            type === 'color'
              ? 'naxatw-input naxatw-h-12 naxatw-w-12 naxatw-p-[3px] naxatw-color-input'
              : 'naxatw-w-20'
          }`}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};
