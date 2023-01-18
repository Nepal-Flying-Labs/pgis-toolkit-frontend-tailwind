import React from 'react';
import PropTypes from 'prop-types';

export default function Chip({
  label,
  active,
  onClick,
  iconLeft,
  iconRight,
  iconClassName,
  iconStyle,
  className,
}) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={`naxatw-px-4 naxatw-py-1.5 naxatw-w-fit hover:naxatw-bg-white 
        naxatw-bg-white naxatw-rounded-3xl naxatw-border naxatw-flex 
        naxatw-items-center naxatw-space-x-1 naxatw-select-none ${
          active
            ? 'naxatw-border-grey-800'
            : 'naxatw-border-grey-300 naxatw-bg-grey-100'
        } ${className}`}
    >
      {iconLeft && (
        <i
          role="button"
          tabIndex="0"
          className={`naxatw-text-[24px] naxatw-text-grey-800 ${iconClassName}`}
          style={iconStyle}
        >
          {iconLeft}
        </i>
      )}
      <span className="naxatw-text-body-lg">{label}</span>

      {iconRight && (
        <i
          role="button"
          tabIndex="0"
          className={`naxatw-text-[24px] naxatw-text-grey-800 ${iconClassName}`}
          style={iconStyle}
        >
          {iconRight}
        </i>
      )}
    </div>
  );
}

Chip.defaultProps = {
  active: false,
  onClick: () => {},
  iconLeft: null,
  iconRight: null,
  iconClassName: 'material-icons',
  iconStyle: {},
  className: '',
};

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.object,
  className: PropTypes.string,
};
