/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import useOutsideClick from '@Hooks/useOutsideClick';
// import isEmpty from '@Utils/commonUtils';
import PropTypes from 'prop-types';

function Select({
  options,
  placeholder,
  onChange,
  disabled,
  selected,
  noDataMessage,
  dataKey,
  className,
  errorClassName,
  errorValue,
}) {
  const [divRef, toggle, handleToggle] = useOutsideClick();
  const handleSelect = item => {
    onChange(item);
  };

  return (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <div
      className={`naxatw-inline-flex  ${
        !errorClassName
          ? 'naxatw-bg-white naxatw-border naxatw-border-[#D7D7D7] '
          : 'naxatw-bg-red-50 naxatw-border naxatw-border-red-100 naxatw-text-red-500'
      } naxatw-rounded-md naxatw-w-full`}
      ref={divRef}
    >
      <div className="naxatw-relative naxatw-w-full">
        <button
          type="button"
          onClick={disabled ? () => {} : () => handleToggle()}
          className={`naxatw-inline-flex naxatw-w-full naxatw-items-center  naxatw-justify-between  naxatw-px-3 naxatw-py-[13px]  naxatw-border-l hover:naxatw-text-gray-700 naxatw-rounded-r-md  ${
            toggle ? 'naxatw-bg-light-green' : ''
          }`}
        >
          <span className="naxatw-text-body-lg">{selected || placeholder}</span>
          {!toggle ? (
            <i className="material-icons">arrow_drop_down</i>
          ) : (
            <i className="material-icons">arrow_drop_up</i>
          )}
        </button>
        <div
          className="naxatw-absolute naxatw-left-0 naxatw-z-10 naxatw-w-full naxatw-mt-2 naxatw-origin-top-right naxatw-bg-white naxatw-border naxatw-border-[#D7D7D7] naxatw-rounded-md naxatw-shadow-lg"
          style={{
            display: toggle ? 'block' : 'none',
          }}
        >
          <ul>
            {options ? (
              options.map(opt => {
                return (
                  <li
                    key={opt.id}
                    role="menuitem"
                    className={`naxatw-whitespace-nowrap naxatw-px-2 naxatw-py-1 naxatw-mt-1
                    naxatw-cursor-pointer naxatw-rounded-sm 
                   hover:naxatw-bg-gray-200  ${
                     selected === opt[dataKey] ? 'naxatw-bg-light-green' : ''
                   }`}
                    onClick={() => {
                      handleSelect(opt);
                      handleToggle(!toggle);
                    }}
                    onKeyDown={() => {}}
                    tabIndex="0"
                  >
                    <span>{opt[dataKey]}</span>
                  </li>
                );
              })
            ) : (
              <li>{noDataMessage}</li>
            )}
          </ul>
        </div>
      </div>
      {errorValue && (
        <span className="naxatw-text-red-600 naxatw-px-2">{errorValue}</span>
      )}
    </div>
  );
}

Select.defaultProps = {
  options: [],
  className: '',
  placeholder: 'Select',
  disabled: false,
  onChange: () => {},
  selected: '',
  noDataMessage: '',
  errorValue: false,
  errorClassName: false,
  dataKey: 'name',
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string || PropTypes.React,
  onChange: PropTypes.func,
  selected: PropTypes.string,
  noDataMessage: PropTypes.string,
  disabled: PropTypes.bool,
  errorValue: PropTypes.bool,
  className: PropTypes.string,
  errorClassName: PropTypes.bool,
  dataKey: PropTypes.string,
};

export default Select;
