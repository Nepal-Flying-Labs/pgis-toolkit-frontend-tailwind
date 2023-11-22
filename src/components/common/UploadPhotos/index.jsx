/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import UserAvatar from '@Assets/images/user-avatar.png';
import MaterialIcon from '../MaterialIcon/index';
import Button from '../Button/index';

function UploadPhotos({
  uploadedFile,
  setFileUpload,
  multiple,
  accept,
  label,
  onChange,
  urlImage,
  isDropzone,
}) {
  const [uploadFile, setUploadFile] = useState(null);
  const onChangeFileUpload = e => {
    const { files } = e.target;
    const file = files[0];
    console.log(file);
    const uploadedFileObject = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModifiedDate: file.lastModifiedDate,
      image: URL.createObjectURL(files[0]),
    };
    onChange(file);
    setUploadFile(uploadedFileObject);
  };

  return (
    <div className="naxatw-mb-2">
      <div className="naxatw-flex naxatw-justify-start naxatw-items-center naxatw-w-full naxatw-h-[144px] naxatw-mb-2 ">
        <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-h-full">
          <label className=" naxatw-flex naxatw-flex-col naxatw-gap-y-3 naxatw-justify-center naxatw-w-full naxatw-h-full naxatw-items-center naxatw-bg-[#F5F5F5] naxatw-rounded-lg naxatw-border-2 naxatw-border-[#BDBDBD] naxatw-border-dashed naxatw-cursor-pointer">
            <MaterialIcon
              name="cloud_upload"
              className="naxatw-text-red-400 naxatw-text-[32px] naxatw-font-normal"
            />
            <span className="naxatw-text-body-md naxatw-text-[#757575]">
              Please upload an image file in either JPEG or PNG format.
            </span>
            <input
              type="file"
              className="naxatw-hidden"
              onChange={e => onChangeFileUpload(e)}
              multiple={multiple}
              accept={accept}
            />
          </label>
        </div>{' '}
      </div>
      <div className="form-group">
        {uploadedFile && (
          <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mb-2 naxatw-px-[20px] naxatw-py-[15px] naxatw-border naxatw-border-[#D7D7D7] naxatw-rounded-xl">
            <div className="naxatw-flex naxatw-gap-x-5 naxatw-items-center">
              <span className="naxatw-w-[60px] naxatw-h-[58px] naxatw-rounded-full naxatw-flex naxatw-justify-center naxatw-items-center naxatw-bg-red-50 naxatw-text-center naxatw-border naxatw-border-[#D7D7D7]">
                {' '}
                <img
                  src={uploadedFile.image || uploadFile?.image}
                  alt="img"
                  className="naxatw-w-full naxatw-h-full naxatw-rounded-full"
                />
              </span>
              <div>
                <p className="naxatw-text-[15px] naxatw-leading-[22px] naxatw-font-bold naxatw-text-[#484848]">
                  {uploadedFile.name}
                </p>
                {/* <span className="naxatw-text-body-md naxatw-text-[#757575]">
                  Uploaded on{' '}
                  {format(
                    new Date(uploadedFile.lastModifiedDate),
                    'MM/dd/yyyy',
                  ) || '-'}
                </span> */}
              </div>
            </div>
            <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4">
              <a
                href={uploadedFile?.fileURL}
                className="hover:naxatw-bg-grey-100 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
              >
                <MaterialIcon
                  name="download"
                  className="naxatw-text-[#484848] naxatw-cursor-pointer"
                  title="Download"
                />
              </a>
              <a
                onClick={() => onChange('')}
                className="hover:naxatw-bg-grey-100 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
              >
                <MaterialIcon
                  name="delete_outline"
                  className="naxatw-text-red-500 naxatw-cursor-pointer"
                  title="Remove"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

UploadPhotos.propTypes = {
  uploadedFile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setFileUpload: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  urlImage: PropTypes.string,
  isDropzone: PropTypes.bool,
};
UploadPhotos.defaultProps = {
  uploadedFile: {},
  multiple: false,
  accept: '*',
  label: 'Upload Image',
  onChange: () => {},
  setFileUpload: () => {},
  urlImage: '',
  isDropzone: true,
};

export default UploadPhotos;
