import React from 'react';
import NoDataYetImg from '@Assets/images/no-data-yet.png';
import Button from '@Components/common/Button/index';

export default function NoPhotosYet() {
  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-10 naxatw-items-center">
      <img width={60} height={60} src={NoDataYetImg} alt="no-data-yet" />
      <h3 className="naxatw-mt-7 naxatw-font-bold">No Images yet</h3>
      <p className="naxatw-mt-2 naxatw-text-center naxatw-text-body-lg">
        Upload your photographs and images or maps related to the project.
      </p>
      <div className="naxatw-flex naxatw-justify-center">
        <Button
          iconLeft="add"
          className="naxatw-btn-primary naxatw-flex"
          onClick={() => {
            // dispatch(toggleModal('upload-dataset'));
          }}
        >
          Add Image
        </Button>
      </div>
    </div>
  );
}
