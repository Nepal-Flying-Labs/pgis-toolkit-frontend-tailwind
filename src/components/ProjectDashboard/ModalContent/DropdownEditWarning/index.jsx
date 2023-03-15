import React from 'react';
import { useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';

const { togglePromptDialog } = CommonCreators;

const DropdownEditWarning = () => {
  const dispatch = useDispatch();
  return (
    <div className="naxatw-space-y-3">
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center">
        <MaterialIcon
          name="warning"
          className="naxatw-text-[40px] naxatw-text-[#fcba03]"
        />
      </div>
      <p className="naxatw-text-body-lg naxatw-font-semibold">
        Editing this field will change all the data associated with given
        attribute in all feature of a layer
      </p>
      <div className="naxatw-py-5 naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Edit Anyway
        </Button>
      </div>
    </div>
  );
};

export default DropdownEditWarning;
