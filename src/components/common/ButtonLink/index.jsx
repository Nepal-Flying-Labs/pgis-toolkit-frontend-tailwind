import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './styles.css';

export default function ButtonLink({ children, className, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`naxatw-btn naxatw-btn-link ${className}`}
    >
      {children}
    </Link>
  );
}

ButtonLink.defaultProps = {
  children: '',
  className: '',
  to: '',
  onClick: () => {},
};

ButtonLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
