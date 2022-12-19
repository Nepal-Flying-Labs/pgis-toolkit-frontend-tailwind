import React, { useEffect } from 'react';
import { Creators } from '@Actions/projectDashboard';
import { useDispatch, useSelector } from 'react-redux';

const { getErrorDetailRequest } = Creators;

export default function UploadFailed() {
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  const uploadErrorResponse = useSelector(
    state => state.projectDashboard.data.uploadErrorResponse,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedData) return;
    dispatch(getErrorDetailRequest({ layer: selectedData.id }));
  }, [dispatch, selectedData]);

  return <div>{uploadErrorResponse && <h4>{uploadErrorResponse}.</h4>}</div>;
}
