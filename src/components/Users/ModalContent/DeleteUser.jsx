import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/users';
import { checkIfLoading } from '@Utils/loaderSelector';
import Button from '@Components/common/Button';

const { togglePromptDialog } = CommonCreators;
const { deleteUserRequest, deleteInvitedUserRequest } = Creators;

export default function DeleteUser() {
  const selectedData = useSelector(state => state.users.item);
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const dispatch = useDispatch();
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [
      Types.DELETE_USER_REQUEST,
      Types.DELETE_INVITED_USER_REQUEST,
    ]),
  );

  const handleDelete = () => {
    if (promptDialogContent === 'delete-user') {
      dispatch(deleteUserRequest(selectedData.id, { is_deleted: true }));
    }
    if (promptDialogContent === 'delete-invited-user') {
      dispatch(deleteInvitedUserRequest(selectedData.id, { is_deleted: true }));
    }
    // return () => {};
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-px-4">
        <h4>Are you sure you want to delete user?</h4>
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
