/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  id,
  label,
  name,
  value,
  onChange,
  className,
  required,
  disabled,
  ...rest
}) => {
  return (
    <div className="naxatw-space-y-2 naxatw-relative">
      {label && (
        <label
          htmlFor={id}
          className={`${disabled ? 'naxatw-label-disabled' : 'naxatw-label'} `}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value || ''}
        className={`naxatw-input naxatw-min-h-[100px] naxatw-max-h-[200px] naxatw-overflow-y-auto scrollbar ${className} naxatw-pr-6`}
        onChange={onChange}
        rows={5}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};
TextArea.defaultProps = {
  name: 'label',
  value: '',
  required: false,
  className: '',
  label: '',
  id: '',
  disabled: false,
};

export default TextArea;
