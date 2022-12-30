import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import GalleryList from './GalleryList/index';
import AdditionalSidebar from '../Common/index';
import NoPhotosYet from './NoPhotosYet/index';

const { getGalleryItemRequest } = ProjectDashboardCreators;
const { toggleModal } = CommonCreators;

export default function Gallery() {
  const { projectId } = useParams();
  const gallery = useSelector(state => state.projectDashboard.gallery.list);
  const dispatch = useDispatch();

  const [toggleRightBar, setToggleRightBar] = useState(false);

  useEffect(() => {
    dispatch(getGalleryItemRequest({ project: projectId }));
  }, [dispatch, projectId]);

  const getContent = () => {
    // if (!layers) return '';
    if (isEmpty(gallery)) return <NoPhotosYet />;
    return <GalleryList openSidebar={setToggleRightBar} />;
  };
  return (
    <div
      className={`${
        toggleRightBar ? 'naxatw-flex naxatw-pl-10' : 'naxatw-px-10'
      } naxatw-absolute naxatw-w-full  `}
    >
      <div
        style={{ width: `${toggleRightBar ? 'calc(100vw - 364px )' : '100%'}` }}
        className={`${toggleRightBar ? 'naxatw-pr-5' : ''}`}
      >
        <div className="naxatw-flex naxatw-justify-between">
          <div className="naxatw-w-2/3">
            <h3 className="naxatw-font-bold naxatw-pt-3 naxatw-pb-1">
              Gallery
            </h3>
            <p className="naxatw-text-body-lg">
              You can add any sort of relevant photographs and images or maps,
              in file format JPEG, PNG, GIF or PDF.
            </p>
          </div>
          <div className="naxatw-flex naxatw-py-[26px] ">
            <Button
              iconLeft="add"
              className="naxatw-btn-primary naxatw-flex"
              onClick={() => {
                dispatch(toggleModal('upload-image'));
              }}
            >
              Add Image
            </Button>
          </div>
        </div>

        {getContent()}
      </div>
      {toggleRightBar && (
        <AdditionalSidebar
          onCloseClick={() => setToggleRightBar(false)}
          flag="gallery"
        />
      )}
    </div>
  );
}
