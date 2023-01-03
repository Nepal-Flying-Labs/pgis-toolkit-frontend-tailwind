/* eslint-disable import/no-named-as-default */
import Creators from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import { isEmpty } from '@Utils/commonUtils';
import { useParams } from 'react-router';
import GalleryCard from './GalleryCard';

const { setRightSidebarState } = CommonCreators;
const { downloadGalleryRequest, setGalleryState, getGalleryByIdRequest } =
  Creators;

function GalleryList() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const searchText = useSelector(
    state => state.projectDashboard.gallery.searchText,
  );
  const gallery = useSelector(state => state.projectDashboard.gallery.list);
  const [downloadIdList, setDownloadIdList] = useState([]);
  // const [selectedCard, setSelectedCard] = useState('');
  const selectedCard = useSelector(
    state => state.projectDashboard.gallery.cardId,
  );

  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setGalleryState({ searchText: debouncedEvent.target.value }));
    },
  });

  const handleSelect = id => {
    if (downloadIdList?.includes(id)) {
      return setDownloadIdList(prev => prev.filter(d => d !== id));
    }
    return setDownloadIdList([...downloadIdList, id]);
  };

  // const handleDownload = id => {
  //   dispatch(
  //     downloadDocumentRequest({ document: [id].join(), project: projectId }),
  //   );
  // };

  const handleDownloadAll = () => {
    dispatch(
      downloadGalleryRequest({
        image: isEmpty(downloadIdList) ? 'all' : downloadIdList?.join(),
        project: projectId,
      }),
    );
  };

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
            onClick={handleDownloadAll}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Download
              {isEmpty(downloadIdList) ? ' All' : ` Selected`}
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
            gallery.map(item => {
              if (
                item?.title?.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return (
                  <GalleryCard
                    key={item.id}
                    label={item.title}
                    id={item.id}
                    status={selectedCard}
                    imgSrc={item.image}
                    checked={downloadIdList?.includes(item.id)}
                    // eslint-disable-next-line no-unused-vars
                    onCardClick={() => {
                      dispatch(setGalleryState({ cardId: item.id }));
                      dispatch(getGalleryByIdRequest(item.id));
                      dispatch(
                        setRightSidebarState({ show: true, flag: 'gallery' }),
                      );
                    }}
                    onCheckSelected={e => {
                      e.stopPropagation();
                      handleSelect(item.id);
                    }}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}

GalleryList.propTypes = {};

GalleryList.defaultProps = {};
export default GalleryList;
