import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteDropdownOptionRequest } = ProjectMapCreators;
const { togglePromptDialog } = CommonCreators;

export default function DeleteDropdownOption() {
  const selectedDropdownOptionId = useSelector(
    state => state.projectMap.selectedDropdownOptionId,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [ProjectMapTypes.DELETE_DROPDOWN_OPTION_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.log(selectedDropdownOptionId);
    dispatch(deleteDropdownOptionRequest(selectedDropdownOptionId));
  };

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>Are you sure to delete ?</h4>
        <p className="naxatw-text-body-lg">
          Deleting this data option will remove this data from all the feature
          from given layer
        </p>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Cancel
        </Button>
        <Button
          className="naxatw-bg-[#FF0F0F] naxatw-text-white"
          iconLeft="delete_outline"
          isLoading={isDeleting}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
