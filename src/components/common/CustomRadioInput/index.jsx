import React from 'react';
import PropTypes from 'prop-types';

function CustomRadio({
  wrapperClassName,
  activeClassName,
  status,
  onClick,
  iconClassName,
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        status ? `${activeClassName}` : ''
      } ${wrapperClassName} naxatw-h-[22px] naxatw-w-[22px] naxatw-cursor-pointer naxatw-border-2 naxatw-border-[#989898] naxatw-rounded-full naxatw-flex naxatw-items-center naxatw-justify-center`}
    >
      {status ? (
        <div
          className={`${iconClassName} naxatw-h-[14px] naxatw-w-[14px] naxatw-rounded-full`}
        />
      ) : (
        ''
      )}
    </div>
  );
}

CustomRadio.propTypes = {
  wrapperClassName: PropTypes.string,
  status: PropTypes.bool,
  activeClassName: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

CustomRadio.defaultProps = {
  wrapperClassName: 'naxatw-relative',
  activeClassName: '',
  status: false,
  iconClassName: 'naxatw-bg-[#484848]',
  onClick: () => {},
};
export default CustomRadio;
