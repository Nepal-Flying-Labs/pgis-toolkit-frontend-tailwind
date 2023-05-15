/* eslint-disable no-nested-ternary */
import React from 'react';
import { hot } from 'react-hot-loader';
import { initDomToCode } from 'dom-to-code';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Components/common/PrivateRoute';
import Toast from '@Components/common/Toast';
import Modal from '@Components/common/Modal';
import ModalTwo from '@Components/common/ModalTwo';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import PromptDialog from '@Components/common/PromptDialog';
import ManageAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/MangeAttributeHeader';
import AddAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/AddAttributesHeader';
import ViewLayerAttributeHeader from '@Components/ProjectDashboard/ModalContent/HeaderContents/ViewLayerAttributeHeader';
import ViewRouteAttributeHeader from '@Components/ProjectDashboard/Analysis/ModalContent/HeaderContents/ViewRouteAttributeHeader';
import CreateAnalysisHeader from '@Components/ProjectDashboard/Analysis/ModalContent/HeaderContents/CreateAnalysisHeader';
import indexRoutes from './routes';
import {
  getModalContent,
  getPromptDialogContent,
  getModalTwoContent,
} from './constants/modalContents';
import './assets/css/tailwind.css';

const {
  toggleModal,
  toggleModalTwo,
  togglePromptDialog,
  setModalContent,
  setModalTwoContent,
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
    case 'view-route-attribute':
      return <ViewRouteAttributeHeader />;
    case 'create-analysis':
      return <CreateAnalysisHeader />;
    default:
      return null;
  }
}

// eslint-disable-next-line
const ModalWrapper = ({ component }) => {
  const showModal = useSelector(state => state.common.showModal);
  const showPromptDialog = useSelector(state => state.common.showPromptDialog);
  const modalContent = useSelector(state => state.common.modalContent);
  const showModalTwo = useSelector(state => state.common.showModalTwo);
  const modalTwoContent = useSelector(state => state.common.modalTwoContent);
  const selectedAnalysisType = useSelector(
    state => state.analysis.selectedAnalysisType,
  );

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

  const handleModalTwoClose = () => {
    dispatch(toggleModalTwo());
    setTimeout(() => {
      dispatch(setModalTwoContent(''));
    }, 150);
  };

  return (
    <>
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
        subtitle={getModalContent(modalContent)?.subtitle}
        onClose={handleModalClose}
        helpContent={getModalContent(modalContent)?.helpContent}
        hideCloseButton={
          !!getModalContent(modalContent).hideCloseButton ||
          (modalContent === 'create-analysis' &&
            selectedAnalysisType === 'optimal-route')
        }
      >
        {getModalContent(modalContent)?.content}
      </Modal>

      <ModalTwo
        show={showModalTwo}
        className={getModalTwoContent(modalTwoContent)?.className || ''}
        title={getModalTwoContent(modalTwoContent)?.title}
        onClose={handleModalTwoClose}
      >
        {getModalTwoContent(modalTwoContent)?.content}
      </ModalTwo>

      {component()}
    </>
  );
};

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
            component={() => <ModalWrapper component={route.component} />}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ) : (
          <Route
            // component={route.component}
            render={() => <ModalWrapper component={route.component} />}
            exact={route.exact ?? false}
            path={route.path}
            key={route.name}
          />
        ),
      )}
    </Switch>
  );
}

function App() {
  return (
    <div className="naxatw-font-primary">
      {process.env.NODE_ENV === 'development' && initDomToCode()}

      <Toast />

      {generateRoutes(indexRoutes)}
    </div>
  );
}

export default hot(module)(App);
