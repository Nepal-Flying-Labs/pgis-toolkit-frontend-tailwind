import React from 'react';
import PropTypes from 'prop-types';

function CustomCheckbox({
  wrapperClassName,
  activeClassName,
  status,
  onClick,
  iconClassName,
  icon,
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        status ? `${activeClassName}` : ''
      } ${wrapperClassName} naxatw-h-6 naxatw-w-6 naxatw-cursor-pointer naxatw-border-2 naxatw-border-[#989898] naxatw-rounded-[4px]`}
    >
      {status ? (
        <i
          className={`${iconClassName} material-icons naxatw-flex naxatw-items-center naxatw-mt-[-1px] naxatw-m-[4px] naxatw-justify-center naxatw-text-[20px] naxatw-font-normal `}
        >
          {icon}
        </i>
      ) : (
        ''
      )}
    </div>
  );
}

CustomCheckbox.propTypes = {
  wrapperClassName: PropTypes.string,
  status: PropTypes.bool,
  activeClassName: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  icon: PropTypes.string,
};

CustomCheckbox.defaultProps = {
  wrapperClassName: 'naxatw-relative',
  activeClassName: 'naxatw-bg-[#484848]',
  status: false,
  iconClassName: 'naxatw-text-white',
  onClick: () => {},
  icon: 'done',
};
export default CustomCheckbox;
