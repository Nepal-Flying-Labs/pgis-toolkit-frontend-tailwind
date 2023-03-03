import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/projectMap';
import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';

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

  console.log(featureImage, 'feature image');

  useEffect(() => {
    if (!selectedFeatureId) return;
    dispatch(getFeatureImageRequest(selectedFeatureId));
  }, [dispatch, selectedFeatureId]);

  const handleModalClose = () => {
    dispatch(setImageModal(false));
    dispatch(setProjectMapState({ selectedFeatureId: null }));
  };

  return (
    <Lightbox
      mainSrc={featureImage[photoIndex]}
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
      reactModalStyle={{ overlay: { zIndex: '99999999' } }}
      nextLabel="Next"
      previousLabel="Previous"
    />
  );
};

export default FeatureImages;
