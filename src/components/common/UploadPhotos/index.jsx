/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import useCustomUpload from '@Hooks/useCustomUpload';
import Dropzone from '../Dropzone/index';

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
  //   console.log(uploadedFile, 'file');
  const [inputRef, onFileUpload] = useCustomUpload();
  const onChangeFileUpload = e => {
    const { files } = e.target;
    const uploadedFileObject =
      // eslint-disable-next-line no-nested-ternary
      uploadedFile?.length > 0 && multiple
        ? [...uploadedFile]
        : uploadedFile?.length > 0
        ? [...uploadedFile.map(file => ({ ...file, isDeleted: true }))]
        : [];
    Object.values(files).forEach(x => {
      uploadedFileObject.push({
        // id: i + 1,
        file: x,
        image: URL.createObjectURL(x),
        filename: x.name,
      });
    });
    onChange(uploadedFileObject);
    setFileUpload(uploadedFileObject);
  };
  const removeFile = index => {
    // const removedFileArray = uploadedFile.filter((file, i) => i !== index);
    const removedFileArray = uploadedFile.map((file, i) =>
      i !== index ? file : { ...file, isDeleted: true },
    );
    // const filterLocalDeletedData = removedFileArray.filter(
    //   (file) => file.filename && !file.isDeleted,
    // );
    setFileUpload(removedFileArray);
    onChange(removedFileArray);
  };
  return (
    <div className="naxatw-mb-2">
      {/* <div
        className="naxatw-flex naxatw-justify-start naxatw-items-center naxatw-w-full naxatw-h-[144px] naxatw-mb-2 "
        onClick={onFileUpload}
      >
        <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-w-full naxatw-h-full">
          <label className=" naxatw-flex naxatw-flex-col naxatw-gap-y-3 naxatw-justify-center naxatw-w-full naxatw-h-full naxatw-items-center naxatw-bg-[#F5F5F5] naxatw-rounded-lg naxatw-border-2 naxatw-border-[#BDBDBD] naxatw-border-dashed naxatw-cursor-pointer">
            <MaterialIcon
              name="cloud_upload"
              className="naxatw-text-red-400 naxatw-text-[32px] naxatw-font-normal"
            />
            <span className="naxatw-text-body-md naxatw-text-[#757575]">
              Please Upload Documents (DOCX,PDF,Excel or CSV file format)
            </span>
            <input
              ref={inputRef}
              type="file"
              className="naxatw-hidden"
              onChange={onChangeFileUpload}
              multiple={multiple}
              accept={accept}
            />
          </label>
        </div>{' '}
      </div> */}

      <Dropzone
        label=" Please Upload Documents (DOCX,PDF,Excel or CSV file format)"
        accept={accept}
        multiple={multiple}
        onChange={onChangeFileUpload}
      />

      <div className="">
        {uploadedFile &&
          uploadedFile?.map(
            (file, i) =>
              !file.isDeleted && (
                // <div
                //   key={i}
                //   className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mb-2 naxatw-px-[20px] naxatw-py-[15px] naxatw-border naxatw-border-[#D7D7D7] naxatw-rounded-xl"
                // >
                //   <div className="naxatw-flex naxatw-gap-x-5 naxatw-items-center">
                //     <span className="naxatw-w-[40px] naxatw-h-[40px] naxatw-rounded-full naxatw-bg-red-50 naxatw-text-center naxatw-border naxatw-border-[#D7D7D7]">
                //       {' '}
                //       <MaterialIcon
                //         name="description"
                //         className="naxatw-text-2xl naxatw-leading-10 naxatw-text-red-500"
                //       />
                //     </span>
                //     <div>
                //       <p className="naxatw-text-[15px] naxatw-leading-[22px] naxatw-font-bold naxatw-text-[#484848]">
                //         File Name
                //       </p>
                //       <span className="naxatw-text-body-md naxatw-text-[#757575]">
                //         Uploaded on 16/11/2022
                //       </span>
                //     </div>
                //   </div>
                //   <div className="naxatw-flex naxatw-items-center naxatw-gap-x-4">
                //     <MaterialIcon
                //       name="download"
                //       className="naxatw-text-[#484848] naxatw-cursor-pointer"
                //     />
                //     <a onClick={() => removeFile(i)}>
                //       <MaterialIcon
                //         name="delete_outline"
                //         className="naxatw-text-red-500 naxatw-cursor-pointer"
                //       />
                //     </a>
                //   </div>
                // </div>
                <a key={i} onClick={() => removeFile(i)}>
                  <img
                    src={file.image || urlImage}
                    alt=""
                    className="naxatw-rounded-full naxatw-max-h-[100px] naxatw-max-w-[100px]"
                  />
                  <div>
                    <span className="naxatw-text-red-500">
                      <MaterialIcon
                        name="close"
                        className="naxatw-text-red-500"
                      />
                    </span>
                  </div>
                </a>
              ),
          )}
      </div>
    </div>
  );
}

UploadPhotos.propTypes = {
  uploadedFile: PropTypes.array,
  setFileUpload: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  urlImage: PropTypes.string,
  isDropzone: PropTypes.bool,
};
UploadPhotos.defaultProps = {
  uploadedFile: [],
  multiple: false,
  accept: '*',
  label: 'Upload Image',
  onChange: () => {},
  setFileUpload: () => {},
  urlImage: '',
  isDropzone: true,
};

export default UploadPhotos;
