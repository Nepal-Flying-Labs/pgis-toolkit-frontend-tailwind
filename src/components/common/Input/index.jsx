/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  label,
  name,
  value,
  onChange,
  className,
  required,
  type,
  ...rest
}) => {
  return (
    <div className="naxatw-space-y-2 naxatw-relative">
      {label && (
        <label htmlFor={id} className="naxatw-label">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value || ''}
        className={`naxatw-input ${className}`}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,

  className: PropTypes.string,
  required: PropTypes.bool,

  label: PropTypes.string,
  id: PropTypes.string,
};
Input.defaultProps = {
  name: 'label',
  type: 'text',
  value: '',

  required: false,
  className: '',

  label: '',
  id: '',
};

export default Input;
