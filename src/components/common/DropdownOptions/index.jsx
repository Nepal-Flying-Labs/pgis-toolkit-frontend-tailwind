/* eslint-disable react/prop-types */
import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '@Hooks/useOutsideClick';
import { CSSTransition } from 'react-transition-group';

function getPosition(direction) {
  switch (direction) {
    case 'left-top':
      return 'naxatw-top-[2px] naxatw-right-[40px]';
    case 'left-bottom':
      return 'naxatw-top-[40px] naxatw-right-[0px]';
    case 'right-bottom':
      return 'naxatw-top-[40px] naxatw-left-[0px]';
    case 'right-top':
      return 'naxatw-top-[2px] naxatw-left-[40px]';
    case 'top-left':
      return 'naxatw-bottom-[40px] naxatw-right-[0px]';
    case 'top-right':
      return 'naxatw-bottom-[40px] naxatw-left-[0px]';
    default:
      return 'naxatw-top-[2px] naxatw-right-[40px]';
  }
}

export default function DropdownOptions({
  options,
  data,
  stopPropagation,
  direction,
}) {
  const [toggleRef, toggle, handleToggle] = useOutsideClick();
  const nodeRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState(direction);

  useLayoutEffect(() => {
    if (!dropdownRef?.current || !toggle) return;
    const { bottom } = dropdownRef.current.getBoundingClientRect();
    const { height } = nodeRef.current.getBoundingClientRect();

    const windowHeight = window.innerHeight;
    if (bottom + height > windowHeight) {
      setPosition('top-left');
    } else {
      setPosition('left-bottom');
    }
  }, [toggle]);

  return (
    <div
      className="naxatw-relative naxatw-w-10 naxatw-flex naxatw-justify-end"
      ref={dropdownRef}
    >
      <a
        ref={toggleRef}
        className="naxatw-inline-flex naxatw-items-center naxatw-text-sm naxatw-font-medium 
           naxatw-text-grey-800 naxatw-rounded-lg hover:naxatw-bg-grey-100 focus:naxatw-ring-4 
           focus:naxatw-outline-none focus:ring-grey-50 naxatw-select-none"
        onClick={e => {
          if (stopPropagation) e.stopPropagation();
          handleToggle();
        }}
      >
        <span
          className="naxatw-flex naxatw-items-center naxatw-justify-center
            naxatw-w-9 naxatw-h-9"
        >
          <button type="button" className="naxatw-text-icon-md naxatw-flex">
            <i className="material-icons naxatw-text-icon-md">more_vert</i>
          </button>
        </span>
      </a>
      <CSSTransition
        in={toggle}
        nodeRef={nodeRef}
        timeout={300}
        unmountOnExit
        // classNames={{
        //   enter: 'naxatw-opacity-0 naxatw-scale-100',
        //   enterActive:
        //     'naxatw-opacity-100 naxatw-translate-x-0 naxatw-duration-300 naxatw-transition-all',
        //   // enterDone: 'naxatw-transform naxatw-opacity-100 naxatw-scale-100',
        //   exit: 'naxatw-opacity-100',
        //   exitActive: 'naxatw-opacity-0 naxatw-transition-all',
        //   // exitDone: 'naxatw-transform naxatw-opacity-0 naxatw-scale-95',
        // }}
      >
        <div
          ref={nodeRef}
          className={`
            ${toggle ? '' : 'naxatw-hidden'} 
            naxatw-absolute ${getPosition(
              position,
            )} naxatw-z-[50] naxatw-w-[12.5rem]
            naxatw-bg-white naxatw-rounded-lg naxatw-divide-y naxatw-divide-grey-100
            naxatw-shadow-3xl naxatw-transition-all naxatw-ease-in-out naxatw-duration-200`}
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
      </CSSTransition>
    </div>
  );
}

DropdownOptions.defaultProps = {
  options: [],
  data: {},
  direction: 'left-top',
};

DropdownOptions.propTypes = {
  options: PropTypes.array,
  data: PropTypes.any,
  direction: PropTypes.string,
};
