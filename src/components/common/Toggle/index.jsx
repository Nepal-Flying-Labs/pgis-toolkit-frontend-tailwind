import React from 'react';
import PropTypes from 'prop-types';

export default function Toggle({ id, name, checked, onChange }) {
  return (
    <label className="naxatw-inline-flex naxatw-relative naxatw-items-center naxatw-cursor-pointer">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="naxatw-sr-only naxatw-peer"
        checked={checked}
        onChange={onChange}
      />
      <div
        className="naxatw-w-11 naxatw-h-6 naxatw-bg-grey-400 naxatw-rounded-full naxatw-peer peer-checked:after:naxatw-translate-x-full
        peer-checked:after:naxatw-border-white after:naxatw-content-[''] after:naxatw-absolute after:naxatw-top-[2px] after:naxatw-left-[2px]
        after:naxatw-bg-white  after:naxatw-border after:naxatw-rounded-full after:naxatw-h-5 after:naxatw-w-5
        after:naxatw-transition-all peer-checked:naxatw-bg-secondary-400"
      />
    </label>
  );
}

Toggle.defaultProps = {
  id: '',
  name: '',
  checked: false,
  onChange: () => {},
};

Toggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
