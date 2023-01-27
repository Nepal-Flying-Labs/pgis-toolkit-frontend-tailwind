import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import searchOSMQuery from '@Utils/searchOSMQuery';

export default function SearchOSM({
  placeholder,
  isSmall,
  className,
  onSelect,
  value,
  iconStyle,
  iconClassName,
  iconName,
  viewBox,
}) {
  const [data, setData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);

  const [searchText, handleChange, setSearchText] = useDebouncedInput({
    ms: 200,
    init: '',
    onChange: async debouncedEvent => {
      const val = debouncedEvent.target.value;
      if (val.length < 2) {
        setData(null);
        return;
      }
      const params = {};
      params.q = val;
      params.format = 'json';
      params.limit = 5;
      if (viewBox) {
        params.viewbox = viewBox.join(',');
        params.bounded = 1;
      }
      const results = await searchOSMQuery(params);
      setData(
        results.map(item => ({
          id: item.place_id,
          label: item.display_name,
          value: [+item.lon, +item.lat],
        })),
      );
      setShowDropdown(true);
    },
  });

  useEffect(() => {
    if (!value) return;
    setSearchText('');
  }, [value, setSearchText]);

  const handleSelect = item => {
    onSelect(item);
    setShowDropdown(false);
  };

  return (
    <div className="naxatw-flex naxatw-relative naxatw-items-center naxatw-w-full naxatw-h-10">
      <label htmlFor="simple-search" className="naxatw-sr-only">
        {placeholder}
      </label>
      <div className="naxatw-relative naxatw-w-full">
        <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
          <i
            role="button"
            tabIndex="0"
            className={`naxatw-text-[24px] naxatw-text-grey-800 ${iconClassName}`}
            style={iconStyle}
          >
            {iconName}
          </i>
        </div>
        {value ? (
          <p
            title={value?.label}
            className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-text-body-lg
              naxatw-rounded-full naxatw-bg-white focus:naxatw-outline-none
              focus:naxatw-border-800 naxatw-block naxatw-w-[15.7rem] naxatw-pl-[44px]
              naxatw-pr-3 naxatw-truncate naxatw-overflow-hidden ${
                isSmall
                  ? 'naxatw-py-2 naxatw-h-[38px]'
                  : 'naxatw-py-3 naxatw-h-[48px]'
              }
            ${className}`}
            onClick={() => onSelect(null)}
          >
            {value?.label}
          </p>
        ) : (
          <input
            type="text"
            className={`naxatw-border naxatw-border-grey-300 naxatw-text-grey-900  naxatw-rounded-full
              focus:naxatw-outline-none  focus:naxatw-border-800
              naxatw-block naxatw-w-full naxatw-pl-[44px] naxatw-pr-3 ${
                isSmall
                  ? 'naxatw-py-2 naxatw-h-[38px]'
                  : 'naxatw-py-3 naxatw-h-[48px]'
              }
            ${className}`}
            placeholder={placeholder}
            value={searchText}
            onChange={handleChange}
          />
        )}
      </div>

      {data && showDropdown && (
        <div
          className="naxatw-absolute naxatw-left-0 naxatw-top-10 naxatw-z-[90000] naxatw-w-full
            naxatw-transition-all  naxatw-ease-in-out naxatw-duration-100 naxatw-mt-2
            naxatw-origin-top-right naxatw-bg-white naxatw-border naxatw-border-300
            naxatw-rounded-md naxatw-shadow-lg"
        >
          <ul className="naxatw-max-h-[14rem] naxatw-overflow-y-auto scrollbar">
            {data.map(item => (
              <li
                key={item.id}
                tabIndex="0"
                role="menuitem"
                className="naxatw-px-3 naxatw-py-2 naxatw-cursor-pointer naxatw-rounded-sm 
                  hover:naxatw-bg-100"
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
  isSmall: false,
  className: '',
  onSelect: () => {},
  value: null,
  iconClassName: 'material-icons',
  iconStyle: {},
  iconName: 'search',
  viewBox: null,
};

SearchOSM.propTypes = {
  placeholder: PropTypes.string,
  isSmall: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  value: PropTypes.object,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.object,
  iconName: PropTypes.string,
  viewBox: PropTypes.array,
};
