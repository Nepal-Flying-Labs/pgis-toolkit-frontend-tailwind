/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEmpty } from '@Utils/commonUtils';
import useOutsideClick from '@Hooks/useOutsideClick';
import Checkbox from '@Components/OrganizationDashboard/User/AssignUsers/Checkbox/index';
import Searchbar from '../Searchbar/index';

function CustomMultiSelect({
  options,
  placeholder,
  className,
  onChange,
  disabled,
  selected,
  noDataMessage,
  errorClassName,
  field,
}) {
  const [newOptions, setNewOptions] = useState([]);
  const [divRef, toggle, handleToggle] = useOutsideClick('multiple');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const optData = options.map(item => ({
      ...item,
      isSelected: selected.map(i => i[field]).includes(item[field]),
    }));
    setNewOptions(optData);
  }, [options, selected, field]);

  const handleSelect = item => {
    const optData = newOptions?.map(unit =>
      unit[field] === item[field]
        ? {
            ...unit,
            isSelected: !unit.isSelected,
          }
        : { ...unit },
    );
    const selectedOptions = optData?.filter(unit => unit.isSelected);
    onChange(selectedOptions);
    setNewOptions(optData);
    setSearchText('');
  };
  const selectedValues = selected.map(item => item[field]);
  return (
    <div
      className={`naxatw-inline-flex naxatw-border ${
        toggle
          ? ' naxatw-border-[2px] naxatw-border-[#484848]'
          : 'naxatw-border-[#BDBDBD] '
      } ${
        !errorClassName
          ? ' '
          : 'naxatw-bg-red-50 naxatw-border naxatw-border-red-100 naxatw-text-red-500'
      } naxatw-rounded-md naxatw-w-full hover:naxatw-border-[#484848]   ${className} ${
        disabled
          ? 'disabled:naxatw-bg-slate-50 disabled:naxatw-text-slate-500 disabled:naxatw-border-slate-200 '
          : ''
      }`}
      //   onClick={disabled ? () => {} : () => handleToggle()}
      ref={divRef}
    >
      <div className="naxatw-relative naxatw-w-full ">
        <div
          className={`naxatw-inline-flex naxatw-w-full  naxatw-items-center naxatw-justify-between naxatw-h-12 naxatw-gap-x-2  naxatw-border-l naxatw-pl-3 naxatw-pr-2 naxatw-py-3 naxatw-border-gray-100 naxatw-cursor-pointer naxatw-rounded-r-md 
            
          }`}
          onClick={disabled ? () => {} : () => handleToggle()}
          onKeyDown={disabled ? () => {} : () => handleToggle()}
        >
          <span className="naxatw-text-body-lg">
            {selectedValues.length > 0
              ? selectedValues.length < 2
                ? selectedValues[0]
                : `${selectedValues.length} Selected`
              : placeholder}
          </span>
          {!toggle ? (
            <i className="material-icons">arrow_drop_down</i>
          ) : (
            <i className="material-icons">arrow_drop_up</i>
          )}
        </div>
        <div
          className="naxatw-absolute  naxatw-w-full naxatw-left-0 naxatw-z-10 naxatw-mt-2 naxatw-origin-top-right naxatw-bg-white naxatw-border naxatw-border-gray-300 naxatw-rounded-md naxatw-shadow-lg"
          style={{
            //  visibility: toggle ? 'visible' : 'hidden' ,
            display: toggle ? 'block' : 'none',
          }}
        >
          <input
            type="text"
            placeholder="Search user by name or email"
            className="naxatw-input"
            value={searchText}
            onFocus={() => handleToggle()}
            onChange={e => setSearchText(e.target.value)}
          />
          <ul
            className=" scrollbar naxatw-max-h-[300px] naxatw-overflow-y-auto"
            style={{
              //  visibility: toggle ? 'visible' : 'hidden' ,
              display: toggle ? 'block' : 'none',
            }}
          >
            {!isEmpty(options) ? (
              options
                .filter(opt =>
                  opt[field].toLowerCase().includes(searchText.toLowerCase()),
                )
                .map(item => (
                  <li
                    key={item?.id || item.code || item?.name}
                    role="menuitem"
                    tabIndex="0"
                    onKeyDown={() => {}}
                    onClick={() => {
                      handleSelect(item);
                    }}
                    className={`naxatw-whitespace-nowrap  naxatw-h-[48px] naxatw-py-2 naxatw-mt-1
                naxatw-cursor-pointer  naxatw-text-body-lg naxatw-text-[#484848]
               hover:naxatw-bg-gray-100  naxatw-flex naxatw-justify-between naxatw-gap-x-2 naxatw-items-center ${
                 selectedValues.includes(item[field])
                   ? 'naxatw-bg-gray-100'
                   : ''
               }`}
                  >
                    <Checkbox
                      className="hover:naxatw-bg-grey-100 naxatw-py-1 naxatw-px-3 naxatw-cursor-pointer !naxatw-min-w-[1.25rem]"
                      key={item.id}
                      id={item.id}
                      label={item[field]}
                      onClick={() => {
                        handleSelect(item);
                      }}
                      checked={selectedValues.includes(item[field])}
                    />
                    {/* {item[field]}
                  {selectedValues.includes(item[field]) && (
                    <i className="material-icons naxatw-text-secondary-400">
                      check
                    </i>
                  )} */}
                  </li>
                ))
            ) : (
              <li>{noDataMessage}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
CustomMultiSelect.defaultProps = {
  options: [],
  placeholder: 'Select',
  className: '',
  onChange: () => {},
  disabled: false,
  selected: [],
  noDataMessage: 'noData',
  errorClassName: false,
  field: 'id',
};
CustomMultiSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string || PropTypes.React,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.array,
  noDataMessage: PropTypes.string,
  errorClassName: PropTypes.bool,
  field: PropTypes.string,
};
export default CustomMultiSelect;
