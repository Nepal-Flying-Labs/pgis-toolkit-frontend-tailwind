/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';
import useCustomUpload from '@Hooks/useCustomUpload';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner';
import Input from '../../InputComponents/Input';

const { uploadIconRequest, deleteIconRequest, handleIconInput } =
  ProjectMapCreators;

export default function StandardStyling() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const [inputRef, onFileUpload] = useCustomUpload();
  const isIconUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_ICON_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleIconUpload = e => {
    const data = {
      icon: e.target.files[0],
    };
    dispatch(uploadIconRequest(selectedLayer.id, data));
  };

  const handleIconDelete = () => {
    const data = {
      icon: '',
      style: {
        ...selectedLayer.style,
        icon: {},
      },
    };
    dispatch(deleteIconRequest(selectedLayer.id, data));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(
      handleIconInput({
        name,
        value,
      }),
    );
  };

  const hasIcon = !!selectedLayer.style.icon.id;

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
      <div className="naxatw-flex naxatw-items-center naxatw-gap-4">
        <div
          className="naxatw-w-10 naxatw-h-10 naxatw-border naxatw-flex
            naxatw-items-center naxatw-justify-center naxatw-rounded-lg
            naxatw-border-grey-500 naxatw-cursor-pointer naxatw-bg-white
            naxatw-p-1"
          onClick={onFileUpload}
        >
          {isIconUploading ? (
            <Spinner className="naxatw-fill-primary-400" />
          ) : selectedLayer.style?.icon?.url ? (
            <img src={selectedLayer.style.icon.url} alt="icon" />
          ) : (
            <MaterialIcon name="add" />
          )}
        </div>
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent"
          onClick={onFileUpload}
        >
          {hasIcon ? 'Change' : 'Upload'} Icon
        </Button>
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleIconUpload}
        />

        {hasIcon && (
          <a title="Remove" onClick={handleIconDelete}>
            <MaterialIcon className="naxatw-text-delete_btn" name="delete" />
          </a>
        )}
      </div>
      <p className="naxatw-text-body-md">
        Note: You may upload locally stored icons in jpeg, png or svg format.
      </p>

      {hasIcon && (
        <Input
          type="number"
          name="scale"
          label="Scale"
          className="naxatw-w-24"
          min={0}
          max={100}
          step={0.01}
          value={selectedLayer.style.icon.scale}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
