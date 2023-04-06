/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useLayoutEffect, useState } from 'react';
import useOutsideClick from '@Hooks/useOutsideClick';
import PropTypes from 'prop-types';
import './styles.css';
import MaterialIcon from '../MaterialIcon';

function getPosition(direction) {
  switch (direction) {
    case 'top':
      return 'naxatw-bottom-[3.4rem]';
    case 'bottom':
      return 'naxatw-top-[3rem]';
    default:
      return 'naxatw-top-[3rem]';
  }
}

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
  labelKey,
  valueKey,
  selectedValue,
  style,
  direction,
  ...rest
}) {
  const [divRef, toggle, handleToggle] = useOutsideClick();
  const [position, setPosition] = useState(direction);
  const handleSelect = item => {
    onChange(item);
  };

  const getSelectedValue = () => {
    return (
      selected ||
      options.find(item => item[valueKey] === selectedValue)?.[labelKey] ||
      placeholder
    );
  };

  useLayoutEffect(() => {
    if (!toggle) return;
    const { bottom } = divRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight / 2 < bottom - 30) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  }, [toggle, divRef]);

  return (
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <div
      className={`naxatw-inline-flex  naxatw-rounded-md naxatw-w-full ${
        disabled ? 'naxatw-bg-grey-100' : ''
      } `}
      ref={divRef}
    >
      <div className="naxatw-relative naxatw-group naxatw-w-full">
        <button
          type="button"
          onClick={disabled ? () => {} : () => handleToggle()}
          className={`${
            disabled ? 'naxatw-select-disabled' : 'naxatw-select'
          }  ${className}  ${toggle ? 'naxatw-bg-100 naxatw-border-800' : ''}`}
          style={style}
          {...rest}
        >
          <span
            className={`naxatw-text-body-lg ${
              disabled ? 'naxatw-text-grey-400' : ''
            }`}
          >
            {getSelectedValue()}
          </span>
          <MaterialIcon
            name={`${!toggle ? 'arrow_drop_down' : 'arrow_drop_up'}`}
            className={`naxatw-text-icon-md ${
              disabled ? 'naxatw-text-grey-400' : ''
            }`}
          />
        </button>
        {toggle && (
          <div
            className={`naxatw-dropdown naxatw-py-2 naxatw-max-h-[14rem]
              naxatw-overflow-y-auto scrollbar  ${getPosition(position)}`}
            // style={{
            //   display: toggle ? 'block' : 'none',
            // }}
          >
            <ul>
              {options.length > 0 ? (
                options.map(item => {
                  return (
                    <li
                      key={item[valueKey]}
                      role="menuitem"
                      className={`naxatw-dropdown-items   ${
                        selected === item[dataKey] || item[valueKey] ? '' : ''
                      }`}
                      onClick={() => {
                        handleSelect(item);
                        handleToggle(!toggle);
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

Select.defaultProps = {
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
  direction: 'bottom',
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
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  direction: PropTypes.string,
};

export default Select;
