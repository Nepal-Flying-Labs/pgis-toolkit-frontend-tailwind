import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';
import useCustomUpload from '@Hooks/useCustomUpload';
import Toggle from '@Components/common/Toggle/index';
import { isEmpty } from '@Utils/commonUtils';
import PropTypes from 'prop-types';
import toastActions from '@Actions/toast';

function validateURL(url) {
  const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
  if (url.match(regex)) {
    return true;
  }
  return false;
}

const ImageUpload = ({ imageList, setImageList }) => {
  const dispatch = useDispatch();
  const [inputRef, onFileUpload] = useCustomUpload();
  const [url, setUrl] = useState('');

  const handleFileChange = e => {
    const { files } = e.target;
    const file = files[0];
    const uploadedFileObject = {
      id: Date.now(),
      name: file.name,
      image: URL.createObjectURL(files[0]),
      isCoverImage: isEmpty(imageList),
      file,
      post: true,
      isChanged: true,
    };
    // setUploadImage(file);
    setImageList([...imageList, uploadedFileObject]);
  };

  const handleAddUrl = () => {
    if (validateURL(url)) {
      const urlObject = {
        id: Date.now(),
        url,
        isCoverImage: isEmpty(imageList),
        post: true,
        isChanged: true,
      };
      setImageList([...imageList, urlObject]);
      setUrl('');
    } else {
      dispatch(
        toastActions.error({
          message: 'Please enter a valid image url.',
        }),
      );
    }
  };

  const handleDelete = id => {
    const newData = imageList.map(image =>
      image.id === id
        ? { ...image, isDeleted: true, isChanged: true }
        : { ...image },
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

  const filterImageList = imageList.filter(image => !image.isDeleted);

  return (
    <div>
      <div className="naxatw-flex naxatw-justify-between">
        <input
          className="naxatw-input"
          placeholder="Image URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-text-[#00A699]"
          onClick={handleAddUrl}
        >
          Add
        </Button>
      </div>
      {/* <div className="naxatw-flex naxatw-justify-center naxatw-py-2 ">
        <span className="naxatw-mr-[3.875rem]">or</span>
      </div> */}

      <div className="naxatw-pt-2 naxatw-flex naxatw-items-center">
        <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
        <p className="naxatw-mx-3 naxatw-text-sm">or</p>
        <hr className="naxatw-h-px naxatw-w-full naxatw-bg-grey-300 naxatw-border-0" />
      </div>
      <div>
        <div className="naxatw-relative naxatw-flex naxatw-items-center naxatw-gap-x-2 naxatw-rounded-xl ">
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-text-[#00A699]"
            iconLeft="upload"
            onClick={onFileUpload}
          >
            Upload Image
          </Button>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => handleFileChange(e)}
            multiple="multiple"
            accept="image/png, image/gif, image/jpeg, image/jpg"
          />
        </div>
      </div>

      {!isEmpty(filterImageList) && (
        <div className="naxatw-bg-white naxatw-max-h-[300px] naxatw-overflow-y-auto scrollbar naxatw-space-y-2 naxatw-p-2 ">
          <div className="naxatw-flex naxatw-justify-between">
            <span className="naxatw-text-body-lg">Image</span>
            <span className="naxatw-text-body-lg">Is cover image?</span>
            <span />
          </div>
          {imageList.map(
            item =>
              !item?.isDeleted && (
                <div
                  key={item.id}
                  className="naxatw-flex naxatw-justify-between naxatw-items-center "
                >
                  <img
                    className="naxatw-w-10 naxatw-h-10 naxatw-rounded-full"
                    src={item.image || item.url}
                    alt=""
                  />
                  <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-basis-1/2">
                    <div className="naxatw-pt-2">
                      <Toggle
                        isSm
                        checked={item.isCoverImage}
                        onChange={() => {
                          handleCoverImage(item.id);
                        }}
                      />
                    </div>
                    <MaterialIcon
                      name="delete_outline"
                      className="naxatw-text-icon-md naxatw-cursor-pointer naxatw-text-[#FF0F0F]"
                      onIconClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              ),
          )}
        </div>
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
