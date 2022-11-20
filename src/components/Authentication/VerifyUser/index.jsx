import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/authentication';

const { verifyUserRequest } = Creators;

export default function VerifyUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    dispatch(verifyUserRequest({ token }));
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="naxatw-font-bold naxatw-mt-6 naxatw-tracking-wider">
        Verifying..
      </h1>
    </div>
  );
}
