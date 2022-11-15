import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, className }) {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: '',
  className: '',
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
