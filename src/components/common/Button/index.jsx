import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, className, onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: '',
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
