/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from '../MaterialIcon/index';

const Input = ({
  id,
  label,
  name,
  value,
  onChange,
  className,
  errorValue,
  required,
  errorClassName,
  hasAddIcon,
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
      {errorValue && (
        <span className="naxatw-text-red-600 naxatw-px-2">{errorValue}</span>
      )}
      {hasAddIcon && (
        <>
          <MaterialIcon
            name="add_circle"
            className="naxatw-absolute naxatw-right-2 naxatw-top-9 naxatw-text-[#00A699]"
          />
          <ul className="naxatw-mt-2">
            <li className="naxatw-flex naxatw-p-3 naxatw-items-center naxatw-justify-between hover:naxatw-bg-gray-200">
              <span className="naxatw-text-body-lg">
                World Health Organization
              </span>
              <MaterialIcon name="close" className="naxatw-cursor-pointer" />
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  errorValue: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  errorClassName: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  hasAddIcon: PropTypes.bool,
};
Input.defaultProps = {
  name: 'label',
  type: 'text',
  value: '',
  errorValue: '',
  required: false,
  className: '',
  errorClassName: false,
  label: '',
  id: '',
  hasAddIcon: false,
};

export default Input;
