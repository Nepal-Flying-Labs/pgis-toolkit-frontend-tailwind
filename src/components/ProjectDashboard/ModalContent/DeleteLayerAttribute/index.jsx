/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { togglePromptDialog } = CommonCreators;
const { updateLayerAttributeRequest } = Creators;

export default function DeleteLayerAttribute() {
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const selectedAttribute = useSelector(
    state => state.projectMap.layerAttributesList.selectedLayerAttribute,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_ATTRIBUTE_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      updateLayerAttributeRequest(selectedAttribute.id, {
        is_deleted: true,
      }),
    );
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-px-4">
        <h4>Are you sure you want to delete this attribute?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-12 naxatw-gap-2">
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
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
