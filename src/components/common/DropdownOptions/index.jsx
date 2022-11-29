import React from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '@Hooks/useOutsideClick';

export default function DropdownOptions({ options, data }) {
  const [toggleRef, toggle, handleToggle] = useOutsideClick();

  return (
    <div className="naxatw-relative naxatw-w-10 naxatw-flex">
      <a
        ref={toggleRef}
        href={() => {}}
        className="naxatw-inline-flex naxatw-items-center naxatw-text-sm naxatw-font-medium naxatw-text-center naxatw-text-grey-800 naxatw-bg-white naxatw-rounded-lg hover:naxatw-bg-grey-100 focus:naxatw-ring-4 focus:naxatw-outline-none focus:ring-grey-50 naxatw-select-none"
        onClick={e => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <i className="material-icons">more_vert</i>
      </a>
      <div
        id="dropdownDots"
        className={`${
          toggle ? '' : 'naxatw-hidden'
        } naxatw-absolute naxatw-top-[2px] naxatw-right-[42px] naxatw-z-10 naxatw-w-[12.5rem] naxatw-bg-white naxatw-rounded-lg naxatw-divide-y naxatw-divide-grey-100 naxatw-shadow-3xl`}
      >
        <ul
          className="naxatw-py-2 naxatw-text-sm naxatw-text-grey-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          {options.map(({ id, label, onClick }) => (
            <li
              key={id}
              className="naxatw-block naxatw-py-[13px] naxatw-px-3 hover:naxatw-bg-grey-100 naxatw-cursor-pointer"
            >
              <a
                href={() => {}}
                onClick={e => {
                  onClick(data);
                  e.stopPropagation();
                }}
              >
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
