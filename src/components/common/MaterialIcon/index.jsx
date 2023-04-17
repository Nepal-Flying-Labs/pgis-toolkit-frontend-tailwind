import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialIcon({
  name,
  className,
  style,
  wrapperClassName,
  onIconClick,
  ...rest
}) {
  return (
    <span
      type="button"
      onClick={onIconClick}
      className={`naxatw-flex naxatw-items-center ${wrapperClassName}`}
      {...rest}
    >
      <i className={`material-icons ${className}`} style={style}>
        {name}
      </i>
    </span>
  );
}

MaterialIcon.defaultProps = {
  className: '',
  style: {},
  wrapperClassName: '',
  onIconClick: () => {},
};

MaterialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  wrapperClassName: PropTypes.string,
  onIconClick: PropTypes.func,
};
