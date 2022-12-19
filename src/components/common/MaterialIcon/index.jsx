import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialIcon({
  name,
  className,
  style,
  wrapperClassName,
}) {
  return (
    <button type="button" className={` ${wrapperClassName}`}>
      <i className={`material-icons ${className}`} style={style}>
        {name}
      </i>
    </button>
  );
}

MaterialIcon.defaultProps = {
  className: '',
  style: {},
  wrapperClassName: '',
};

MaterialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  wrapperClassName: PropTypes.string,
};
