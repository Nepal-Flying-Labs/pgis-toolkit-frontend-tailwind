/* eslint-disable no-nested-ternary */
import React from 'react';
import { hot } from 'react-hot-loader';
import { initDomToCode } from 'dom-to-code';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Components/common/PrivateRoute';
import Toast from '@Components/common/Toast';
import './assets/css/tailwind.css';
import Modal from '@Components/common/Modal/index';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import PromptDialog from '@Components/common/PromptDialog/index';
import indexRoutes from './routes';
import {
  getModalContent,
  getPromptDialogContent,
} from './constants/modalContents';

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

const { toggleModal, togglePromptDialog } = CommonCreators;

function App() {
  const showModal = useSelector(state => state.common.showModal);
  const showPromptDialog = useSelector(state => state.common.showPromptDialog);
  const modalContent = useSelector(state => state.common.modalContent);
  const promptDialogContent = useSelector(
    state => state.common.promptDialogContent,
  );
  const dispatch = useDispatch();

  return (
    <div className="naxatw-font-primary">
      {process.env.NODE_ENV === 'development' && initDomToCode()}
      <Toast />
      <PromptDialog
        show={showPromptDialog}
        title={getPromptDialogContent(promptDialogContent)?.title}
        onClose={() => dispatch(togglePromptDialog())}
      >
        {getPromptDialogContent(promptDialogContent)?.content}
      </PromptDialog>

      <Modal
        show={showModal}
        className={getModalContent(modalContent)?.className || ''}
        title={getModalContent(modalContent)?.title}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)?.content}
      </Modal>
      {generateRoutes(indexRoutes)}
    </div>
  );
}

export default hot(module)(App);
