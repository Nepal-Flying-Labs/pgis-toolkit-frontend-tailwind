import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { togglePromptDialog } = CommonCreators;
const { deleteDataQueryRequest, deleteAllDataQueryRequest } =
  ProjectMapCreators;

export default function DeleteDataQuery() {
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const selectedData = useSelector(
    state => state.projectMap.dataQuery.selectedData,
  );
  const queryData = useSelector(
    state => state.projectMap.dataQuery.queryResults,
  );
  const dispatch = useDispatch();
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [
      Types.DELETE_DATA_QUERY_REQUEST,
      Types.DELETE_ALL_DATA_QUERY_REQUEST,
    ]),
  );

  const handleDelete = () => {
    if (promptDialogContent === 'delete-all-data-query') {
      const payloadData = queryData.map(item => item.id);
      dispatch(deleteAllDataQueryRequest(payloadData));
    } else {
      dispatch(deleteDataQueryRequest({ layer: selectedData.id }));
    }
  };

  return (
    <div>
      <div className="naxatw-mb-5">
        <h4>
          {promptDialogContent === 'delete-all-data-query'
            ? 'Are you sure to delete all query results?'
            : 'Are you sure to delete this query result?'}
        </h4>
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
