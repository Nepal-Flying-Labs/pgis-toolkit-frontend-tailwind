import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function UploadFailed() {
  // const selectedData = selected();
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <div>upload failed</div>;
}
