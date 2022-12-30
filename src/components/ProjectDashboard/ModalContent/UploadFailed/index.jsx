import React, { useEffect } from 'react';
import { Creators, Types } from '@Actions/projectDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner';

const { getErrorDetailRequest } = Creators;

export default function UploadFailed() {
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  const uploadErrorResponse = useSelector(
    state => state.projectDashboard.data.uploadErrorResponse,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ERROR_DETAIL_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedData) return;
    dispatch(getErrorDetailRequest({ layer: selectedData.id }));
  }, [dispatch, selectedData]);

  return (
    <div>
      {loading ? (
        <div className="naxatw-h-16 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Spinner className="!naxatw-h-8 !naxatw-w-8 naxatw-fill-grey-500" />
        </div>
      ) : (
        uploadErrorResponse && (
          <h4 className="naxatw-break-all">{uploadErrorResponse}.</h4>
        )
      )}
    </div>
  );
}
