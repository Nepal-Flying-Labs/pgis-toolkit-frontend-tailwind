/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import useOutsideClick from '@Hooks/useOutsideClick';
import MaterialIcon from '../MaterialIcon/index';

export default function CustomDropdownOptions({
  options,
  data,
  stopPropagation,
}) {
  const [toggle, handleToggle] = useState(false);
  //   const [toggleRef, toggle, handleToggle] = useOutsideClick();

  return (
    <div
      className="naxatw-relative naxatw-z-10 naxatw-w-10 naxatw-flex naxatw-justify-end"
      tabIndex={0}
      onBlur={() => handleToggle(false)}
    >
      <a
        // ref={toggleRef}
        className="naxatw-inline-flex naxatw-items-center naxatw-text-sm naxatw-font-medium 
           naxatw-text-grey-800 naxatw-rounded-lg hover:naxatw-bg-grey-100 focus:naxatw-ring-4 
           focus:naxatw-outline-none focus:ring-grey-50 naxatw-select-none"
        onClick={e => {
          if (stopPropagation) e.stopPropagation();
          handleToggle(prev => !prev);
        }}
      >
        <MaterialIcon
          title="Options"
          className="naxatw-text-icon-md"
          name="more_vert"
          wrapperClassName="naxatw-icon-btn naxatw-icon-btn-sm"
        />
      </a>
      <div
        className={`${
          toggle
            ? '-naxatw-translate-x-1'
            : 'naxatw-invisible naxatw-translate-x-3'
        } naxatw-absolute naxatw-top-[2px] naxatw-right-[40px] naxatw-z-[10] naxatw-w-[12.5rem]
          naxatw-bg-white naxatw-rounded-lg naxatw-divide-y naxatw-divide-grey-100 naxatw-shadow-3xl naxatw-transition-all naxatw-ease-in-out naxatw-duration-200`}
      >
        <ul
          className="naxatw-py-2 naxatw-text-sm naxatw-text-grey-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          {options.map(({ id, label, onClick }) => (
            <li
              role="presentation"
              key={id}
              className="naxatw-block naxatw-py-2 naxatw-px-3 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
              onClick={e => {
                onClick(data);
                if (stopPropagation) e.stopPropagation();
              }}
            >
              <a>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

CustomDropdownOptions.defaultProps = {
  options: [],
  data: {},
};

CustomDropdownOptions.propTypes = {
  options: PropTypes.array,
  data: PropTypes.any,
};
