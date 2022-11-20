import React from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '@Hooks/useOutsideClick';

export default function DropdownOptions({ options, data }) {
  const [toggleRef, toggle, handleToggle] = useOutsideClick();

  return (
    <div className="naxatw-relative naxatw-w-10">
      <a
        ref={toggleRef}
        href={() => {}}
        className="naxatw-inline-flex naxatw-items-center naxatw-p-2 naxatw-text-sm naxatw-font-medium naxatw-text-center naxatw-text-gray-900 naxatw-bg-white naxatw-rounded-lg hover:naxatw-bg-gray-100 focus:naxatw-ring-4 focus:naxatw-outline-none focus:ring-gray-50"
        onClick={handleToggle}
      >
        <i className="material-icons">more_vert</i>
      </a>
      <div
        id="dropdownDots"
        className={`${
          toggle ? '' : 'naxatw-hidden'
        } naxatw-absolute naxatw-top-[2px] naxatw-right-[42px] naxatw-z-10 naxatw-w-[12.5rem] naxatw-bg-white naxatw-rounded-lg naxatw-divide-y naxatw-divide-gray-100 naxatw-shadow-3xl`}
      >
        <ul
          className="naxatw-py-2 naxatw-text-sm naxatw-text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          {options.map(({ label, onClick }) => (
            <li
              key={label}
              className="naxatw-block naxatw-py-[13px] naxatw-px-3 hover:naxatw-bg-gray-100"
            >
              <a href={() => {}} onClick={() => onClick(data)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

DropdownOptions.defaultProps = {
  options: [],
  data: {},
};

DropdownOptions.propTypes = {
  options: PropTypes.array,
  data: PropTypes.any,
};
