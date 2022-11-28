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
  errorClassName,
  errorValue,
}) {
  // eslint-disable-next-line no-unused-vars
  const [divRef, toggle, handleToggle] = useOutsideClick();

  const handleSelect = item => {
    onChange(item);
  };

  return (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <div
      className={`naxatw-inline-flex  ${
        !errorClassName
          ? 'naxatw-bg-white naxatw-border naxatw-border-gray-100 naxatw-text-gray-600 hover:naxatw-bg-gray-200'
          : 'naxatw-bg-red-50 naxatw-border naxatw-border-red-100 naxatw-text-red-500'
      } naxatw-rounded-xl naxatw-w-16 `}
      ref={divRef}
    >
      <div className="naxatw-relative naxatw-w-full">
        <button
          type="button"
          onClick={disabled ? () => {} : () => handleToggle()}
          className={`naxatw-inline-flex naxatw-w-full naxatw-items-center naxatw-justify-between naxatw-h-8 naxatw-px-2  naxatw-border-l hover:naxatw-text-gray-700 naxatw-rounded-xl  ${
            toggle ? 'naxatw-bg-light-green' : ''
          }`}
        >
          <span>{selected || placeholder}</span>
          {!toggle ? (
            <i className="material-icons">arrow_drop_up</i>
          ) : (
            <i className="material-icons">arrow_drop_down</i>
          )}
        </button>
        <div
          className="naxatw-absolute naxatw-bottom-0 naxatw-z-20 naxatw-w-full naxatw-mb-10 naxatw-origin-top-right naxatw-bg-white naxatw-border naxatw-border-gray-100 naxatw-rounded-md naxatw-shadow-lg"
          style={{
            //  visibility: toggle ? 'visible' : 'hidden' ,
            display: toggle ? 'block' : 'none',
          }}
        >
          <ul className="">
            {options ? (
              options.map(opt => {
                return (
                  <li
                    key={opt.id}
                    role="menuitem"
                    className={`naxatw-whitespace-nowrap naxatw-px-2 naxatw-py-1 naxatw-mt-1
                    naxatw-cursor-pointer naxatw-rounded-sm naxatw-text-xl naxatw-font-semibold
                   hover:naxatw-bg-light-green naxatw-text-gray-500 ${
                     selected === opt.value ? 'naxatw-bg-light-green' : ''
                   }`}
                    onClick={() => {
                      handleSelect(opt);
                      handleToggle(!toggle);
                    }}
                    onKeyDown={() => {}}
                    tabIndex="0"
                  >
                    <span>{opt?.value || opt?.name}</span>
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
  placeholder: 'Select',
  disabled: false,
  onChange: () => {},
  selected: '',
  noDataMessage: '',
  errorValue: false,
  errorClassName: false,
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string || PropTypes.React,
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  noDataMessage: PropTypes.string,
  disabled: PropTypes.bool,
  errorValue: PropTypes.bool,
  errorClassName: PropTypes.bool,
};

export default Select;
