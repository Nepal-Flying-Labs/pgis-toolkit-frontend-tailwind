/* eslint-disable import/no-named-as-default */
import React from 'react';
import NoPhotoYetImg from '@Assets/images/no-photo-yet.png';
import Button from '@Components/common/Button/index';
import Creators from '@Actions/common';
import { useDispatch } from 'react-redux';

export default function NoPhotosYet() {
  const dispatch = useDispatch();
  const { toggleModal } = Creators;

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-10 naxatw-items-center">
      <img width={60} height={60} src={NoPhotoYetImg} alt="no-data-yet" />
      <h3 className="naxatw-mt-7 naxatw-font-bold">No Images yet</h3>
      <p className="naxatw-mt-2 naxatw-text-center naxatw-text-body-lg">
        Upload your photographs and images or maps related to the project.
      </p>
      <div className="naxatw-flex naxatw-justify-center naxatw-mt-7">
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
  );
}
