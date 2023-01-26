import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDebouncedInput from '@Hooks/useDebouncedInput';

async function searchOSMQueries(params) {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${searchParams}`,
  );
  const json = res.json();
  return json;
}

// eslint-disable-next-line
export default function SearchOSM({ placeholder, isSmall, className }) {
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchText, handleChange] = useDebouncedInput({
    ms: 200,
    init: '',
    onChange: async debouncedEvent => {
      const { value } = debouncedEvent.target;
      if (value.length < 2) {
        setData(null);
        return;
      }
      const params = {};
      params.q = value;
      params.format = 'json';
      params.limit = 5;
      const results = await searchOSMQueries(params);
      setData(
        results.map(item => ({
          id: item.place_id,
          label: item.display_name,
          value: [+item.lat, +item.lon],
        })),
      );
    },
  });

  const handleSelect = item => {
    setSelectedItem(item);
    setShowDropdown(false);
  };

  return (
    <div className="naxatw-flex naxatw-relative naxatw-items-center naxatw-w-full naxatw-h-12">
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
        {selectedItem ? (
          <p
            title={selectedItem?.label}
            className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-rounded-full
              naxatw-bg-white focus:naxatw-outline-none  focus:naxatw-border-[#484848]
              naxatw-block naxatw-w-[15.7rem] naxatw-pl-[44px] naxatw-pr-3 naxatw-truncate
              naxatw-overflow-hidden ${
                isSmall
                  ? 'naxatw-py-2 naxatw-h-[40px]'
                  : 'naxatw-py-3 naxatw-h-[48px]'
              }
            ${className}`}
          >
            {selectedItem?.label}
          </p>
        ) : (
          <input
            type="text"
            className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900  naxatw-rounded-full
              focus:naxatw-outline-none  focus:naxatw-border-[#484848]
              naxatw-block naxatw-w-full naxatw-pl-[44px] naxatw-pr-3 ${
                isSmall
                  ? 'naxatw-py-2 naxatw-h-[40px]'
                  : 'naxatw-py-3 naxatw-h-[48px]'
              }
            ${className}`}
            placeholder={placeholder}
            value={searchText}
            onChange={handleChange}
            // onFocus={() => setShowDropdown(true)}
            // onBlur={() => setShowDropdown(false)}
          />
        )}
      </div>

      {data && showDropdown && (
        <div
          className="naxatw-absolute naxatw-left-0 naxatw-top-10 naxatw-z-[90000] naxatw-w-full
            naxatw-transition-all  naxatw-ease-in-out naxatw-duration-100 naxatw-mt-2
            naxatw-origin-top-right naxatw-bg-white naxatw-border naxatw-border-[#D7D7D7]
            naxatw-rounded-md naxatw-shadow-lg"
          // style={{
          //   display: toggle ? 'block' : 'none',
          // }}
        >
          <ul className="naxatw-h-[14rem] naxatw-overflow-y-auto scrollbar">
            {data.map(item => (
              <li
                key={item.id}
                tabIndex="0"
                role="menuitem"
                className="naxatw-px-3 naxatw-py-2 naxatw-cursor-pointer naxatw-rounded-sm 
                  hover:naxatw-bg-[#F5F5F5]"
                onClick={() => {
                  handleSelect(item);
                }}
                onKeyDown={() => {}}
              >
                <span className="naxatw-text-body-lg">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

SearchOSM.defaultProps = {
  placeholder: 'Search',
};

SearchOSM.propTypes = {
  placeholder: PropTypes.string,
};
