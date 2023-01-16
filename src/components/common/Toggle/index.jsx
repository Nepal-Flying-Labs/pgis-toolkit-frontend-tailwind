import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Toggle({
  id,
  name,
  checked,
  onChange,
  isSm,
  className,
}) {
  return (
    <label className={`naxatw-toggle-label ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="naxatw-sr-only naxatw-peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`naxatw-toggle 
         naxatw-peer peer-checked:after:naxatw-translate-x-full 
         peer-checked:after:naxatw-border-white
         peer-checked:naxatw-bg-secondary-400 ${
           isSm ? 'naxatw-toggle-sm' : ''
         }`}
      />
    </label>
  );
}

Toggle.defaultProps = {
  id: '',
  name: '',
  checked: false,
  isSm: false,
  onChange: () => {},
  className: '',
};

Toggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  checked: PropTypes.bool,
  isSm: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
