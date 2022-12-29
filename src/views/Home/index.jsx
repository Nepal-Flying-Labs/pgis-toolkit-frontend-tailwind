import React, { useEffect } from 'react';
import { Creators } from '@Actions/authentication';
import AppLoader from '@Components/common/AppLoader/index';
import { useDispatch } from 'react-redux';
// import Header from '@Components/common/Header';

const { getLandingPageRequest } = Creators;

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingPageRequest());
  }, [dispatch]);

  return <AppLoader />;
}
