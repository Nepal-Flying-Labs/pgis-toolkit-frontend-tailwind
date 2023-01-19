import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import { isEmpty } from '@Utils/commonUtils';
import Button from '@Components/common/Button/index';
import AdditionalSidebar from '../Common/index';
import NoPhotosYet from './NoPhotosYet/index';
import GalleryList from './GalleryList/index';

const { getGalleryItemRequest, setGalleryState, downloadGalleryRequest } =
  ProjectDashboardCreators;
const { toggleModal, setRightSidebarState, togglePromptDialog } =
  CommonCreators;

export default function Gallery() {
  const { projectId } = useParams();
  const gallery = useSelector(state => state.projectDashboard.gallery.list);
  const toggleRightBar = useSelector(state => state.common.rightSidebar.show);
  const dispatch = useDispatch();

  const handleDownload = id => {
    dispatch(
      downloadGalleryRequest({ image: [id].join(), project: projectId }),
    );
  };

  useEffect(() => {
    dispatch(setRightSidebarState({ show: false, flag: '' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGalleryItemRequest({ project: projectId }));
  }, [dispatch, projectId]);

  const getContent = () => {
    // if (!layers) return '';
    if (isEmpty(gallery)) return <NoPhotosYet />;
    return <GalleryList />;
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
              You can add any sort of project relevant photographs, images or
              maps, in various file format such as jpeg, png. tiff, etc.
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
          onCloseClick={() => {
            dispatch(setGalleryState({ cardId: null }));
            dispatch(setRightSidebarState({ show: false, flag: '' }));
          }}
          onDownload={id => handleDownload(id)}
          onDelete={data => {
            dispatch(setGalleryState({ delete: { ...data, projectId } }));
            dispatch(togglePromptDialog('delete-gallery'));
          }}
          onEdit={() => {
            dispatch(toggleModal('edit-image'));
          }}
        />
      )}
    </div>
  );
}
