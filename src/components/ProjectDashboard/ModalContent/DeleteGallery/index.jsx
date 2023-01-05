import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as ProjectDashboardCreators,
  Types as ProjectDashboardTypes,
} from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteGalleryRequest } = ProjectDashboardCreators;
const { togglePromptDialog } = CommonCreators;

export default function DeleteGallery() {
  const deleteGallery = useSelector(
    state => state.projectDashboard.gallery.delete,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [ProjectDashboardTypes.DELETE_GALLERY_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (isDeleting) return;
    dispatch(
      deleteGalleryRequest(deleteGallery?.id, {
        is_deleted: true,
      }),
    );
  };

  return (
    <div>
      <div className="naxatw-px-4 -naxatw-mt-5">
        <h4>Are you sure to delete {deleteGallery?.name}?</h4>
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
