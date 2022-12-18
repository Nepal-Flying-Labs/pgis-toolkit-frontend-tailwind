/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@Actions/common';
import Button from '@Components/common/Button';
import SignInBanner from '@Components/Authentication/SignInBanner';
import SignIn from '@Components/Authentication/SignIn';
import SignUp from '@Components/Authentication/SignUp';
import ForgotPassword from '@Components/Authentication/ForgotPassword';
import Modal from '@Components/common/Modal';
import { getModalContent } from '@src/constants/modalContents';

const { toggleModal } = Creators;

export default function Authentication() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);

  const getContent = () => {
    switch (pathname) {
      case '/login':
        return <SignIn />;
      case '/sign-up':
        return <SignUp />;
      case '/forgot-password':
        return <ForgotPassword />;
      default:
        return <SignIn />;
    }
  };

  return (
    <main className="naxatw-h-screen naxatw-p-6 naxatw-font-primary">
      <Modal
        show={showModal}
        title={getModalContent(modalContent)?.title}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)?.content}
      </Modal>
      <div className="naxatw-h-full naxatw-px-4">
        <div className="naxatw-flex naxatw-h-full naxatw-flex-wrap">
          <SignInBanner />

          <div className="naxatw-grow naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-relative">
            <div className="naxatw-absolute naxatw-right-0 naxatw-top-0 naxatw-flex naxatw-gap-4 naxatw-items-center">
              <p className="naxatw-text-body-lg">Don&apos;t have an account?</p>
              <Button className="naxatw-btn-secondary hover:naxatw-underline">
                Get Started
              </Button>
            </div>
            <div className="naxatw-mx-auto naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-text-center naxatw-w-[27.5rem]">
              {getContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
