/* eslint-disable import/no-named-as-default */
import Creators from '@Actions/projectDashboard';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GalleryCard from './GalleryCard';

export default function GalleryList() {
  const dispatch = useDispatch();
  const { setSearchText } = Creators;
  const searchText = useSelector(state => state?.projectDashboard?.searchText);
  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setSearchText(debouncedEvent.target.value));
    },
  });
  return (
    <div className="">
      <div className="naxatw-py-2 naxatw-flex naxatw-justify-between">
        <div className="naxatw-flex naxatw-items-center naxatw-w-60 naxatw-mt-4 ">
          <Searchbar
            placeholder="Search"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <div className="">
          <a className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
            <span className="material-icons naxatw-text-[#00A699]">
              download
            </span>
            <span className="naxatw-text-[#00A699]">Download All</span>
          </a>
        </div>
      </div>

      <div className="naxatw-py-3 naxatw-flex naxatw-flex-wrap naxatw-gap-5">
        {Array.from({ length: 10 }).map(index => (
          <GalleryCard label="Construction site" id={index} status="5" />
        ))}
      </div>
    </div>
  );
}
