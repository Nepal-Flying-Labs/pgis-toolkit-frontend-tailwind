import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Button({
  children,
  className,
  onClick,
  iconLeft,
  iconRight,
}) {
  return (
    <button
      type="button"
      className={`naxatw-btn ${className}`}
      onClick={onClick}
    >
      <i className="material-icons naxatw-mr-2 naxatw-text-[22px]">
        {iconLeft}
      </i>
      {children}
      <i className="material-icons naxatw-mr-2 naxatw-text-[22px]">
        {iconRight}
      </i>
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
