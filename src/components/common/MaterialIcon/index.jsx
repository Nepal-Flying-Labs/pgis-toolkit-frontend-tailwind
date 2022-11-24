import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialIcon({ name, className }) {
  return <i className={`material-icons ${className}`}>{name}</i>;
}

MaterialIcon.defaultProps = {
  className: '',
};

MaterialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
