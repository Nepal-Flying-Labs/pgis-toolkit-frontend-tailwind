import React from 'react';
import PropTypes from 'prop-types';

export default function IconButton({
  name,
  className,
  style,
  wrapperClassName,
  onClick,
}) {
  return (
    <span
      type="button"
      onClick={onClick}
      className={`naxatw-flex naxatw-items-center naxatw-cursor-pointer ${wrapperClassName}`}
    >
      <i className={`material-icons ${className}`} style={style}>
        {name}
      </i>
    </span>
  );
}

IconButton.defaultProps = {
  className: '',
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
