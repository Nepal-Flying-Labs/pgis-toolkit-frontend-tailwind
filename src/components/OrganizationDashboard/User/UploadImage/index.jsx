/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react';
import useCustomUpload from '@Hooks/useCustomUpload';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import Button from '@Components/common/Button';
import MaterialIcon from '@Components/common/MaterialIcon';
import getImageSource from '@Utils/getImageSource';

function UploadImage({ uploadedFile, setuploadedFile }) {
  const [error, setError] = useState(false);
  const [inputRef, onFileUpload] = useCustomUpload();
  const [geojson, setGeojson] = useState(null);

  const onChangeFileUpload = e => {
    const uploadedFileObject = [];
    const { files } = e.target;
    const image = URL.createObjectURL(files[0]);
    files[0].image = image;
    setuploadedFile(files[0]);
  };

  return (
    <div className="naxatw-space-y-2">
      <div>
        <div
          className={`naxatw-relative naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-rounded-xl ${
            error ? 'naxatw-border naxatw-border-red-500' : ''
          }`}
        >
          <div className="naxatw-w-[80px] naxatw-h-[80px] naxatw-rounded-full naxatw-border naxatw-flex naxatw-items-center naxatw-justify-center">
            <img
              src={
                uploadedFile?.image
                  ? getImageSource(uploadedFile.image)
                  : AvatarIcon
              }
              alt="img"
              className="naxatw-w-[80px] naxatw-h-[80px] naxatw-object-cover naxatw-rounded-full"
            />
          </div>
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder "
            iconLeft="upload"
            onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload Profile Image
            </span>
          </Button>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => onChangeFileUpload(e)}
            multiple="multiple"
          />
        </div>
        {error && (
          <span className="naxatw-text-[#FF0F0F]">File not supported</span>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
