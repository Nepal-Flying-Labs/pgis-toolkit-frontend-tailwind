/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/index';
import MaterialIcon from '../MaterialIcon/index';

const SearchList = ({
  data,
  onOptionClick,
  dataKey,
  alternateKey,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const datas = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      item[dataKey]
        ? item[dataKey].toLowerCase().includes(searchTerm.toLowerCase())
        : item[alternateKey]
        ? item[alternateKey].toLowerCase().includes(searchTerm.toLowerCase())
        : item.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, data, alternateKey, dataKey]);

  return (
    <div>
      <div className="naxatw-relative">
        <input
          name="search"
          className="naxatw-input naxatw-rounded-b-none !naxatw-pl-10 "
          value={searchTerm}
          placeholder="Search"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <MaterialIcon
          name="search"
          className="naxatw-absolute naxatw-top-3 naxatw-left-3"
        />
      </div>

      <div
        className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-t-none
                  naxatw-rounded-lg naxatw-overflow-y-auto scrollbar naxatw-h-[11rem] !naxatw-border-t-0"
      >
        {isLoading && (
          <div className="naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
            <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
          </div>
        )}
        <ul>
          {datas.map((opt, index) => (
            <li
              key={index}
              role="presentation"
              className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                    naxatw-cursor-pointer hover:naxatw-bg-grey-100"
              onClick={() => {
                onOptionClick(opt);
                setSearchTerm('');
              }}
            >
              {dataKey ? opt[dataKey] || opt[alternateKey] : opt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchList;

SearchList.propTypes = {
  data: PropTypes.array,
  onOptionClick: PropTypes.func,
  dataKey: PropTypes.string,
  alternateKey: PropTypes.string,
  isLoading: PropTypes.bool,
};

SearchList.defaultProps = {
  data: [],
  onOptionClick: () => {},
  dataKey: '',
  alternateKey: '',
  isLoading: false,
};
