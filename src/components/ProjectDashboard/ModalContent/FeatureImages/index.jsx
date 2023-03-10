import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/projectMap';
import Lightbox from 'react-18-image-lightbox';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { saveAs } from 'file-saver';
import isEmpty from '@Utils/isEmpty';
import 'react-18-image-lightbox/style.css';

const { setImageModal } = CommonCreators;
const { getFeatureImageRequest, setProjectMapState } = Creators;

const FeatureImages = () => {
  const dispatch = useDispatch();
  const [photoIndex, setPhotoIndex] = useState(0);
  const featureImages = useSelector(state => state.projectMap.featureImage);
  const selectedFeatureId = useSelector(
    state => state.projectMap.selectedFeatureId,
  );
  const featureImage = featureImages.map(image => image.image || image.url);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_FEATURE_IMAGE_REQUEST]),
  );
  useEffect(() => {
    if (!selectedFeatureId) return;
    dispatch(getFeatureImageRequest(selectedFeatureId));
  }, [dispatch, selectedFeatureId]);

  const handleModalClose = () => {
    dispatch(setImageModal(false));
    dispatch(setProjectMapState({ selectedFeatureId: null, featureImage: [] }));
  };

  const handleDownloadImage = () => {
    if (featureImage[photoIndex]) {
      const fileNameArray = featureImage[photoIndex]?.split('/');
      const fileName = fileNameArray
        ? fileNameArray[fileNameArray.length - 1]
        : '';
      saveAs(featureImage[photoIndex], fileName);
    }
  };

  return isLoading ? (
    <div className="!naxatw-z-[999999999] naxatw-fixed naxatw-inset-0 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-bg-black naxatw-bg-opacity-80 naxatw-opacity-60">
      <Spinner className="!naxatw-w-10 !naxatw-h-10 naxatw-fill-grey-800" />
    </div>
  ) : (
    <Lightbox
      mainSrc={featureImage[photoIndex] || 'No Image'}
      nextSrc={featureImage[(photoIndex + 1) % featureImage.length]}
      prevSrc={
        featureImage[
          (photoIndex + featureImage.length - 1) % featureImage.length
        ]
      }
      onCloseRequest={handleModalClose}
      onMovePrevRequest={() =>
        setPhotoIndex(
          (photoIndex + featureImage.length - 1) % featureImage.length,
        )
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % featureImage.length)
      }
      reactModalStyle={{
        overlay: { zIndex: '99999999' },
      }}
      toolbarButtons={
        !isEmpty(featureImage)
          ? [
              <div title="Download">
                <MaterialIcon
                  name="download"
                  className="naxatw-text-icon-md naxatw-text-grey-600 naxatw-cursor-pointer hover:naxatw-text-white naxatw-pb-2 naxatw-pr-3"
                  onIconClick={handleDownloadImage}
                />
              </div>,
            ]
          : []
      }
      imageLoadErrorMessage={
        <h4 className="naxatw-text-white">Image not found</h4>
      }
    />
  );
};

export default FeatureImages;
