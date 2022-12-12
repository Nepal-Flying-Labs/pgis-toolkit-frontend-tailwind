import React from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ className, placeholder, value, onChange }) {
  return (
    <div className="naxatw-flex naxatw-items-center naxatw-w-full naxatw-h-12">
      <label htmlFor="simple-search" className="naxatw-sr-only">
        {placeholder}
      </label>
      <div className="naxatw-relative naxatw-w-full">
        <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
          <svg
            aria-hidden="true"
            className="naxatw-w-5 naxatw-h-5 naxatw-text-grey-500"
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
        <input
          type="text"
          className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-rounded-full focus:naxatw-ring-blue-500 focus:naxatw-border-blue-500 naxatw-block naxatw-w-full naxatw-pl-10 naxatw-p-2.5 ${className}`}
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
  className: 'naxatw-bg-grey-100',
  placeholder: 'Search',
  value: '',
  onChange: () => {},
};

Searchbar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
