/* eslint-disable import/no-named-as-default */
import Creators from '@Actions/projectDashboard';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@Components/common/Button/index';
import noImg from '@Assets/images/noImage.png';
import GalleryCard from './GalleryCard';

function GalleryList({ openSidebar }) {
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
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder "
            iconLeft="download"
            // onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Download All
            </span>
          </Button>
        </div>
      </div>

      <div
        style={{
          height: `calc(100vh - 234px)`,
          transition: 'ease-in-out 300ms',
        }}
        className="naxatw-py-3 naxatw-overflow-hidden naxatw-overflow-y-auto scrollbar"
      >
        <div className="naxatw-flex naxatw-flex-wrap naxatw-gap-5">
          {Array.from({ length: 15 }).map(index => (
            <GalleryCard
              label="Construction site"
              id={index}
              status="5"
              imgSrc={noImg}
              checked={false}
              onCardClick={id => {
                console.log('Gallery card clicked id : ', id);
                openSidebar(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

GalleryList.propTypes = {
  openSidebar: PropTypes.func,
};

GalleryList.defaultProps = {
  openSidebar: () => {},
};
export default GalleryList;
