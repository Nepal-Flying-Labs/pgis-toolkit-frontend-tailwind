import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({
  className,
  placeholder,
  value,
  onChange,
  isSmall,
  isFocus,
}) {
  const inputRef = useRef();
  const handleClearSearch = () => {
    onChange({ target: { value: '' } });
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!isFocus) return;
    inputRef.current.focus();
  }, [isFocus]);

  return (
    <div
      className={`naxatw-flex naxatw-items-center naxatw-w-full ${
        isSmall ? 'naxatw-h-10' : 'naxatw-h-12'
      } `}
    >
      <label htmlFor="simple-search" className="naxatw-sr-only">
        {placeholder}
      </label>
      <div className="naxatw-relative naxatw-w-full">
        <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
          <svg
            aria-hidden="true"
            className="naxatw-w-[22px] naxatw-h-[22px] naxatw-text-grey-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {value && (
          <div
            className={`naxatw-absolute naxatw-right-3 ${
              isSmall ? 'naxatw-top-2' : 'naxatw-top-3'
            } naxatw-cursor-pointer 
        naxatw-rounded-full naxatw-bg-grey-200 hover:naxatw-bg-grey-400 naxatw-flex naxatw-items-center naxatw-justify-center naxatw-p-1`}
            onClick={handleClearSearch}
          >
            <span
              className="material-icons naxatw-text-grey-800  
         naxatw-text-icon-sm"
            >
              close
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900  naxatw-rounded-full focus:naxatw-outline-none  focus:naxatw-border-[#484848]
            naxatw-block naxatw-w-full naxatw-pl-[44px] naxatw-pr-3 ${
              isSmall
                ? 'naxatw-py-2 naxatw-h-[40px]'
                : 'naxatw-py-3 naxatw-h-[48px]'
            }
            ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

Searchbar.defaultProps = {
  className: '',
  placeholder: 'Search',
  value: '',
  onChange: () => {},
  isSmall: false,
  isFocus: false,
};

Searchbar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isSmall: PropTypes.bool,
  isFocus: PropTypes.bool,
};
