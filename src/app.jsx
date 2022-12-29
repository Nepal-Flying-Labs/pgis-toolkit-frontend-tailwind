/* eslint-disable no-nested-ternary */
import React from 'react';
import { hot } from 'react-hot-loader';
import { initDomToCode } from 'dom-to-code';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Components/common/PrivateRoute';
import Toast from '@Components/common/Toast';
import Modal from '@Components/common/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import PromptDialog from '@Components/common/PromptDialog';
import ManageAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/MangeAttributeHeader';
import AddAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/AddAttributesHeader';
import ViewLayerAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/ViewLayerAttributeHeader';
import indexRoutes from './routes';
import {
  getModalContent,
  getPromptDialogContent,
} from './constants/modalContents';
import './assets/css/tailwind.css';

function generateRoutes(routes) {
  return (
    <Switch>
      {routes.map(route =>
        Array.isArray(route.component) ? (
          <Route
            path={route.path}
            key={route.name}
            exact={route.exact ?? false}
          >
            {generateRoutes(route.component)}
          </Route>
        ) : route.authenticated ? (
          <PrivateRoute
            component={route.component}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ) : (
          <Route
            component={route.component}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ),
      )}
    </Switch>
  );
}

const {
  toggleModal,
  togglePromptDialog,
  setModalContent,
  setPromptDialogContent,
} = CommonCreators;

function getHeaderContent(modalContents) {
  switch (modalContents) {
    case 'manage-attributes':
      return <ManageAttributeHeader />;
    case 'add-attributes':
      return <AddAttributeHeader />;
    case 'view-layer-attribute':
      return <ViewLayerAttributeHeader />;
    default:
      return null;
  }
}

function App() {
  const showModal = useSelector(state => state.common.showModal);
  const showPromptDialog = useSelector(state => state.common.showPromptDialog);
  const modalContent = useSelector(state => state.common.modalContent);
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const dispatch = useDispatch();

  const handlePromptDialogClose = () => {
    dispatch(togglePromptDialog());
    setTimeout(() => {
      dispatch(setPromptDialogContent(''));
    }, 150);
  };

  const handleModalClose = () => {
    dispatch(toggleModal());
    setTimeout(() => {
      dispatch(setModalContent(''));
    }, 150);
  };

  return (
    <div className="naxatw-font-primary">
      {process.env.NODE_ENV === 'development' && initDomToCode()}
      <Toast />
      <PromptDialog
        show={showPromptDialog}
        title={getPromptDialogContent(promptDialogContent)?.title}
        onClose={handlePromptDialogClose}
      >
        {getPromptDialogContent(promptDialogContent)?.content}
      </PromptDialog>

      <Modal
        show={showModal}
        className={getModalContent(modalContent)?.className || ''}
        headerContent={getHeaderContent(modalContent)}
        title={getModalContent(modalContent)?.title}
        onClose={handleModalClose}
      >
        {getModalContent(modalContent)?.content}
      </Modal>
      {generateRoutes(indexRoutes)}
    </div>
  );
}

export default hot(module)(App);
