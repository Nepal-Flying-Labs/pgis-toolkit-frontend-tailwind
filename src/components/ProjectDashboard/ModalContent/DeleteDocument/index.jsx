import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import {
  Creators as ProjectDashboardCreators,
  Types as ProjectDashboardTypes,
} from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteDocumentRequest } = ProjectDashboardCreators;
const { togglePromptDialog } = CommonCreators;

export default function DeleteDocument() {
  const deleteDocument = useSelector(
    state => state.projectDashboard.document.delete,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [ProjectDashboardTypes.DELETE_DOCUMENT_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (isDeleting) return;
    dispatch(
      deleteDocumentRequest(deleteDocument?.id, {
        is_deleted: true,
      }),
    );
  };

  return (
    <div>
      <div className="naxatw-px-4 -naxatw-mt-5">
        <h4>Are you sure to delete {deleteDocument?.name}?</h4>
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-gap-2">
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
