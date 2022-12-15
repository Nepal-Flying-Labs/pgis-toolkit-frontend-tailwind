import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialIcon({ name, className, style }) {
  return (
    <i className={`material-icons ${className}`} style={style}>
      {name}
    </i>
  );
}

MaterialIcon.defaultProps = {
  className: '',
  style: {},
};

MaterialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
