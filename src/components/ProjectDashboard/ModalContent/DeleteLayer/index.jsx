import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import {
  Creators as ProjectDashboardCreators,
  Types as ProjectDashboardTypes,
} from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteLayerRequest } = ProjectMapCreators;
const { deleteDataRequest } = ProjectDashboardCreators;
const { togglePromptDialog } = CommonCreators;

export default function DeleteLayer() {
  const deleteLayer = useSelector(state => state.projectMap.deleteLayer);
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [
      ProjectMapTypes.DELETE_LAYER_REQUEST,
      ProjectDashboardTypes.DELETE_DATA_REQUEST,
    ]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (isDeleting) return;
    if (deleteLayer?.deleteType === 'data') {
      dispatch(deleteDataRequest(deleteLayer?.id, { is_deleted: true }));
    } else {
      dispatch(deleteLayerRequest(deleteLayer?.id, { is_deleted: true }));
    }
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-px-4">
        <h4>Are you sure to delete {deleteLayer?.name}?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-12 naxatw-gap-2">
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={() => {
            dispatch(togglePromptDialog());
          }}
        >
          Discard
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
