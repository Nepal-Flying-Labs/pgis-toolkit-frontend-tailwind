import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton({
  name,
  className,
  style,
  wrapperClassName,
  onClick,
  ...rest
}) {
  return (
    <span
      type="button"
      onClick={onClick}
      className={`naxatw-flex naxatw-items-center naxatw-cursor-pointer
        naxatw-select-none naxatw-p-2 ${wrapperClassName}`}
      {...rest}
    >
      <i className={className} style={style}>
        {name}
      </i>
    </span>
  );
}

IconButton.defaultProps = {
  className: 'material-icons',
  style: {},
  wrapperClassName: '',
  onClick: () => {},
};

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
};
