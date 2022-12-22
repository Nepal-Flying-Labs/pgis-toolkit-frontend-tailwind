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
  iconRight,
  onIconClick,
  iconClassName,
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
        className={`naxatw-input ${className} naxatw-pr-6`}
        onChange={onChange}
        {...rest}
      />

      {iconRight && (
        <button
          type="button"
          className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center  naxatw-absolute naxatw-z-10 naxatw-top-[31px] naxatw-right-4"
          onClick={onIconClick}
        >
          <i className={`material-icons ${iconClassName} naxatw-text-[22px]`}>
            {iconRight}
          </i>
        </button>
      )}
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
  onIconClick: PropTypes.func,
  iconRight: PropTypes.string,
  iconClassName: PropTypes.string,
};
Input.defaultProps = {
  name: 'label',
  type: 'text',
  value: '',

  required: false,
  className: '',

  label: '',
  id: '',
  onIconClick: () => {},
  iconRight: null,
  iconClassName: 'naxatw-text-[#00A699]',
};

export default Input;
