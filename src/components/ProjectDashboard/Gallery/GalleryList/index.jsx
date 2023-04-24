/* eslint-disable import/no-named-as-default */
import { Types, Creators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import Searchbar from '@Components/common/Searchbar/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@Components/common/Button/index';
import { isEmpty } from '@Utils/commonUtils';
import { useParams } from 'react-router';
import { checkIfLoading } from '@Utils/loaderSelector';
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
  const isDownloading = useSelector(state =>
    checkIfLoading(state, [Types.DOWNLOAD_GALLERY_REQUEST]),
  );
  const gallery = useSelector(state => state.projectDashboard.gallery.list);
  const [downloadIdList, setDownloadIdList] = useState([]);

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

  const [resultList, setResultList] = useState([]);
  const corouselImages = [];
  resultList?.map(rl => corouselImages.push(rl?.image));

  // useEffect(() => {
  //   if (!isEmpty(gallery)) {
  //     setResultList(gallery);
  //   }
  // }, [gallery]);

  useEffect(() => {
    if (!isEmpty(gallery)) {
      setResultList(
        gallery.filter(item =>
          item?.title?.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  }, [searchText, gallery]);

  return (
    <div className="">
      <div className="naxatw-py-1 naxatw-flex naxatw-items-center naxatw-justify-between">
        <div className="naxatw-flex naxatw-items-center naxatw-w-60">
          <Searchbar
            isSmall
            placeholder="Search"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <div className="">
          <Button
            isLoading={isDownloading}
            className="naxatw-btn-secondary  naxatw-btn-sm naxatw-btn-noborder "
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
        className="naxatw-py-2 naxatw-overflow-hidden naxatw-overflow-y-auto scrollbar"
      >
        <div className="naxatw-flex naxatw-flex-wrap naxatw-gap-5">
          {(!isEmpty(resultList) &&
            resultList.map(item => (
              <GalleryCard
                key={item.id}
                label={item.title}
                id={item.id}
                status={selectedCard}
                imgSrc={item.image}
                checked={downloadIdList?.includes(item.id)}
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
                corouselImages={corouselImages}
              />
            ))) || (
            <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-5 naxatw-items-center">
              <p className="naxatw-mt-2 naxatw-text-center naxatw-text-body-lg">
                No data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

GalleryList.propTypes = {};

GalleryList.defaultProps = {};
export default GalleryList;
