import React, { useEffect } from 'react';
import { Creators } from '@Actions/authentication';
import { useDispatch } from 'react-redux';
// import Header from '@Components/common/Header';

const { getLandingPageRequest } = Creators;

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingPageRequest());
  }, [dispatch]);
  return (
    <div>
      <h3 className="naxatw-fixed naxatw-inset-0 naxatw-flex naxatw-justify-center naxatw-items-center">
        Initializing App
      </h3>
    </div>
  );
}
