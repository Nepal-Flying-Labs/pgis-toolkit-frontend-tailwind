import React, { useState } from 'react';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';
import useCustomUpload from '@Hooks/useCustomUpload';
import Toggle from '@Components/common/Toggle/index';
import { isEmpty } from '@Utils/commonUtils';
import PropTypes from 'prop-types';

const ImageUpload = ({ imageList, setImageList }) => {
  const [inputRef, onFileUpload] = useCustomUpload();
  const [url, setUrl] = useState('');

  const handleFileChange = e => {
    const { files } = e.target;
    const file = files[0];
    const uploadedFileObject = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModifiedDate: file.lastModifiedDate,
      image: URL.createObjectURL(files[0]),
      isCoverImage: isEmpty(imageList),
      file,
      post: true,
    };
    // setUploadImage(file);
    setImageList([...imageList, uploadedFileObject]);
  };

  const handleAddUrl = () => {
    if (url) {
      const urlObject = {
        id: Date.now(),
        url,
        isCoverImage: isEmpty(imageList),
        post: true,
      };
      setImageList([...imageList, urlObject]);
      setUrl('');
    }
  };

  const handleDelete = id => {
    const newData = imageList.map(image =>
      image.id === id ? { ...image, isDeleted: true } : { ...image },
    );
    setImageList(newData);
  };

  const handleCoverImage = id => {
    const newData = imageList.map(image => {
      const { isCoverImage } = image;
      return image.id === id
        ? { ...image, isCoverImage: !isCoverImage, isChanged: true }
        : { ...image, isCoverImage: false, isChanged: true };
    });
    setImageList(newData);
  };

  return (
    <div>
      <div className="naxatw-flex naxatw-justify-between">
        <input
          className="naxatw-input"
          placeholder="Image url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button onClick={handleAddUrl}>Add</Button>
      </div>

      <span>OR</span>
      <div>
        <div className="naxatw-relative naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-rounded-xl ">
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder "
            iconLeft="upload"
            onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload
            </span>
          </Button>
          {/* <div>
            <Spinner />
          </div> */}
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => handleFileChange(e)}
            multiple="multiple"
            accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream/,.geojson"
          />
        </div>
      </div>

      {imageList.map(
        item =>
          !item?.isDeleted && (
            <div key={item.id} className="naxatw-flex naxatw-justify-between">
              <img
                className="naxatw-w-10 naxatw-h-10 naxatw-rounded-full"
                src={item.image || item.url}
                alt=""
              />
              <div className="naxatw-flex naxatw-gap-x-2">
                <MaterialIcon
                  name="delete_outline"
                  className="naxatw-text-icon-md naxatw-cursor-pointer"
                  onIconClick={() => handleDelete(item.id)}
                />
                <div>
                  <Toggle
                    checked={item.isCoverImage}
                    onChange={() => {
                      handleCoverImage(item.id);
                    }}
                  />
                </div>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  imageList: PropTypes.array,
  setImageList: PropTypes.func,
};

ImageUpload.defaultProps = {
  imageList: [],
  setImageList: () => {},
};

export default ImageUpload;
