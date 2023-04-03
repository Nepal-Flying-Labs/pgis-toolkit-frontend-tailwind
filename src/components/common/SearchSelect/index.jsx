/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
// import useOutsideClick from '@Hooks/useOutsideClick';
// import isEmpty from '@Utils/commonUtils';
import PropTypes from 'prop-types';
import '@Components/common/Select/styles.css';
import MaterialIcon from '@Components/common/MaterialIcon/index';

function SearchSelect({
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
  labelKey,
  valueKey,
  selectedValue,
  style,
  ...rest
}) {
  function useClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler],
    );
  }
  const [toggle, setToggle] = useState(false);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef(null);
  const searchRef = useRef();
  //   const [divRef, toggle, handleToggle] = useOutsideClick();
  const handleSelect = item => {
    onChange(item);
    setSearchText('');
  };

  useEffect(() => {
    if (toggle) {
      searchRef.current.focus();
    } else {
      setSearchText('');
    }
  }, [toggle]);

  const ref = useRef();

  useClickOutside(ref, () => setToggle(false));

  const getSelectedValue = () => {
    return (
      selected ||
      options.find(item => item[valueKey] === selectedValue)?.[labelKey] ||
      placeholder
    );
  };

  const handleDeleteData = e => {
    e.stopPropagation();
    onChange(null);
    if (toggle) {
      searchRef.current.focus();
    }
  };

  const filterOptions = options.filter(
    opt =>
      opt[dataKey].toLowerCase().slice(0, searchText.length) ===
      searchText.toLowerCase(),
  );

  return (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <div className={`naxatw-inline-flex  naxatw-rounded-md naxatw-w-full `}>
      <div
        className="naxatw-relative naxatw-group naxatw-w-full"
        ref={ref}
        onClick={disabled ? () => {} : () => setToggle(!toggle)}
      >
        <button
          type="button"
          className={`!naxatw-rounded-lg ${
            disabled
              ? 'naxatw-select-disabled naxatw-bg-grey-100 naxatw-cursor-not-allowed'
              : 'naxatw-select'
          } ${className}  ${
            toggle ? 'naxatw-bg-[#F5F5F5] naxatw-border-[#484848]' : ''
          }`}
          style={style}
          {...rest}
        >
          <span className="naxatw-text-body-lg">{getSelectedValue()}</span>
        </button>
        <input
          style={{ display: toggle ? 'block' : 'none' }}
          ref={searchRef}
          type="text"
          placeholder={selected || placeholder}
          className={`naxatw-input naxatw-absolute naxatw-top-0 naxatw-left-0 ${
            disabled ? '!naxatw-bg-grey-100' : ''
          }`}
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
          }}
          disabled={disabled}
        />

        <div className="naxatw-absolute naxatw-top-3 naxatw-right-4 naxatw-flex naxatw-gap-x-2 naxatw-divide-x-2">
          {selected ? (
            <MaterialIcon
              name="close"
              className="naxatw-text-icon-sm naxatw-cursor-pointer"
              onIconClick={e => handleDeleteData(e)}
            />
          ) : (
            <div />
          )}

          <MaterialIcon
            name={`${!toggle ? 'arrow_drop_down' : 'arrow_drop_up'}`}
            className="naxatw-text-icon-md naxatw-cursor-pointer"
          />
        </div>

        {toggle && (
          <div className="naxatw-dropdown naxatw-min-w-fit naxatw-max-h-[200px] naxatw-overflow-auto scrollbar">
            <ul>
              {options && filterOptions.length > 0 ? (
                filterOptions.map(item => {
                  return (
                    <li
                      key={item.id}
                      role="menuitem"
                      className={`naxatw-dropdown-items  ${
                        getSelectedValue() === item[dataKey] || item[valueKey]
                          ? ''
                          : ''
                      }`}
                      onClick={() => {
                        handleSelect(item);
                        setToggle(!toggle);
                      }}
                      onKeyDown={() => {}}
                      tabIndex="0"
                    >
                      <span className="naxatw-text-body-lg">
                        {item[dataKey] || item[labelKey]}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="naxatw-dropdown-items naxatw-text-body-lg">
                  {noDataMessage}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {errorValue && (
        <span className="naxatw-text-red-600 naxatw-px-2">{errorValue}</span>
      )}
    </div>
  );
}

SearchSelect.defaultProps = {
  options: [],
  className: 'naxatw-select-md',
  placeholder: 'Select',
  disabled: false,
  onChange: () => {},
  selected: '',
  noDataMessage: 'No data available',
  errorValue: false,
  errorClassName: false,
  dataKey: 'name',
  labelKey: 'label',
  valueKey: 'id',
  selectedValue: '',
  style: {},
};

SearchSelect.propTypes = {
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
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

export default SearchSelect;
