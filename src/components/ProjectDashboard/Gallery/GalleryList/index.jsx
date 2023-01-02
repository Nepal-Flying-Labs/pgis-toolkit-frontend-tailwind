/* eslint-disable import/no-named-as-default */
import Creators from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import { isEmpty } from '@Utils/commonUtils';
import GalleryCard from './GalleryCard';

const { setRightSidebarState } = CommonCreators;
const { setSearchText } = Creators;

function GalleryList() {
  const dispatch = useDispatch();
  const searchText = useSelector(state => state?.projectDashboard?.searchText);
  const gallery = useSelector(state => state.projectDashboard.gallery.list);

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
          {!isEmpty(gallery) &&
            gallery.map(item => (
              <GalleryCard
                label={item.title}
                id={item.id}
                status=""
                imgSrc={item.image}
                checked={false}
                // eslint-disable-next-line no-unused-vars
                onCardClick={id => {
                  // console.log('Gallery card clicked id : ', id);
                  dispatch(
                    setRightSidebarState({ show: true, flag: 'gallery' }),
                  );
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

GalleryList.propTypes = {};

GalleryList.defaultProps = {};
export default GalleryList;
