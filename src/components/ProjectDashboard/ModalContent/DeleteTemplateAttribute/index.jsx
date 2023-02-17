/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators, Types } from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { togglePromptDialog } = CommonCreators;
const { deleteTemplateAttributeRequest } = Creators;

export default function DeleteDataQuery() {
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const individualAttribute = useSelector(
    state => state.projectDashboard.data.manageData.individualAttribute,
  );
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [Types.DELETE_TEMPLATE_ATTRIBUTE_REQUEST]),
  );
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteTemplateAttributeRequest(individualAttribute.id, {
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
