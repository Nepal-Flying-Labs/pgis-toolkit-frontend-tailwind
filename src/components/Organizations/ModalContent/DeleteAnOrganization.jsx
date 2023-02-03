import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/organizations';
import { checkIfLoading } from '@Utils/loaderSelector';
import Button from '@Components/common/Button';

const { togglePromptDialog } = CommonCreators;
const { deleteOrganizationRequest } = Creators;

export default function DeleteAnOrganization() {
  const selectedOrganization = useSelector(
    state => state.organizations.selectedOrganization,
  );
  //   const promptDialogContent = useSelector(
  //     state => state.common.promptDialogContent,
  //   );
  const dispatch = useDispatch();
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [Types.DELETE_ORGANIZATION_REQUEST]),
  );

  const handleDelete = () => {
    dispatch(
      deleteOrganizationRequest(selectedOrganization?.id, { is_deleted: true }),
    );
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-px-4">
        <h4 className="naxatw-text-center">
          Are you sure you want to delete organization{' '}
          <b>{selectedOrganization?.name}</b>?
        </h4>
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
