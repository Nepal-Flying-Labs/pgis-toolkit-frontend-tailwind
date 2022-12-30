import React from 'react';
import SignupSuccess from '@Components/Authentication/ModalContent/SignupSuccess';
import {
  CreateAnOrganization,
  CreateOrganizationSuccess,
} from '@Components/Organizations/ModalContent';
import AccessToFunctionalities from '@Components/ModalContent/AccessToFunctionalities';
import CreateProject from '@Components/OrganizationDashboard/ModalContent/CreateProject';
import CreateProjectSuccess from '@Components/OrganizationDashboard/ModalContent/CreateProjectSuccess';
import CreateNewUser from '@Components/OrganizationDashboard/ModalContent/CreateNewUser';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer';
import DeleteLayer from '@Components/ProjectDashboard/ModalContent/DeleteLayer';
import SaveAsDraft from '@Components/OrganizationDashboard/ModalContent/SaveAsDraft';
import UploadDataset from '@Components/ProjectDashboard/ModalContent/UploadDataset';
import DataQuery from '@Components/ProjectDashboard/ModalContent/DataQuery';
import Analysis from '@Components/ProjectDashboard/ModalContent/Analysis';
import BufferAnalysis from '@Components/ProjectDashboard/ModalContent/Analysis/BufferAnalysis';
import UploadFailed from '@Components/ProjectDashboard/ModalContent/UploadFailed';
import DownloadLayer from '@Components/ProjectDashboard/ModalContent/DownloadLayer';
import ManageAttributes from '@Components/ProjectDashboard/ModalContent/ManageAttributes';
import AddAttributes from '@Components/ProjectDashboard/ModalContent/AddAttributes';
import AddWMSLayer from '@Components/ProjectDashboard/ModalContent/AddWMSLayer';
import UploadImage from '@Components/ProjectDashboard/ModalContent/UploadImage';
import UploadDocument from '@Components/ProjectDashboard/ModalContent/UploadDocument';
import ImportOSM from '@Components/ProjectDashboard/ModalContent/ImportOSM';
import EditDocument from '@Components/ProjectDashboard/ModalContent/EditDocument';
import SaveDataQuery from '@Components/ProjectDashboard/ModalContent/SaveDataQuery';
import DeleteDataQuery from '@Components/ProjectDashboard/ModalContent/DeleteDataQuery';
import AccountSettings from '@Components/Authentication/ModalContent/AccountSettings';
import ViewLayerAttribute from '@Components/ProjectDashboard/ModalContent/ViewLayerAttribute';

export function getModalContent(content) {
  switch (content) {
    // authentication
    case 'sign-up-success':
      return {
        title: '',
        content: <SignupSuccess />,
      };
    case 'account-settings':
      return {
        title: 'Account Settings',
        content: <AccountSettings />,
        className: '!naxatw-w-[63.25rem] !naxatw-max-w-[63.25rem]',
      };
    // organizations
    case 'create-organization':
      return {
        title: 'Create an Organization',
        content: <CreateAnOrganization />,
      };
    case 'create-organization-success':
      return {
        title: 'Create an Organization',
        content: <CreateOrganizationSuccess />,
      };
    case 'access-to-functionalities':
      return {
        title: '',
        content: <AccessToFunctionalities />,
      };

    // project dashboard
    case 'create-project':
      return {
        title: '',
        content: <CreateProject />,
      };
    case 'create-project-success':
      return {
        title: '',
        content: <CreateProjectSuccess />,
      };
    case 'create-new-user':
      return {
        title: 'Create a new user',
        content: <CreateNewUser />,
      };

    // project map
    case 'upload-layer':
      return {
        title: 'Upload layer',
        content: <AddLayer />,
      };
    case 'upload-dataset':
      return {
        title: 'Upload your datasets',
        content: <UploadDataset />,
      };
    case 'view-layer-attribute':
      return {
        title: 'Layer Attribute',
        content: <ViewLayerAttribute />,
        className: '!naxatw-w-[1000px]',
      };
    case 'data-query':
      return {
        title: 'Data Query',
        content: <DataQuery />,
        // className: '!naxatw-w-[63.25rem]',
      };
    case 'analysis':
      return {
        title: 'Analysis',
        content: <Analysis />,
      };
    case 'buffer-analysis':
      return {
        title: 'Buffer Analysis',
        content: <BufferAnalysis />,
      };

    // project data
    case 'download-layer':
      return {
        title: 'Download Layer',
        content: <DownloadLayer />,
      };

    case 'import-osm':
      return {
        title: 'Import from OSM',
        content: <ImportOSM />,
      };

    // project gallery
    case 'upload-image':
      return {
        title: 'Upload your image',
        content: <UploadImage />,
      };

    // project document
    case 'upload-document':
      return {
        title: 'Upload your documents',
        content: <UploadDocument />,
      };

    case 'edit-document':
      return {
        title: 'Edit your documents',
        content: <EditDocument />,
      };

    // manage data
    case 'add-wms-layer':
      return {
        title: 'Add WMS Layer',
        content: <AddWMSLayer />,
      };
    case 'manage-attributes':
      return {
        title: 'Manage Attributes',
        content: <ManageAttributes />,
        className: '!naxatw-w-[56.25rem]',
      };
    case 'add-attributes':
      return {
        title: 'Add Attributes',
        content: <AddAttributes />,
        className: '!naxatw-w-[56.25rem]',
      };
    default:
      return {
        title: '',
        content: '',
      };
  }
}

export function getPromptDialogContent(content) {
  switch (content) {
    case 'delete-layer':
      return {
        title: '',
        content: <DeleteLayer />,
      };
    case 'save-as-draft':
      return {
        title: '',
        content: <SaveAsDraft />,
      };
    case 'upload-failed':
      return {
        title: '',
        content: <UploadFailed />,
      };
    case 'delete-document':
      return {
        title: '',
        content: <DeleteLayer />,
      };
    case 'save-data-query':
      return {
        title: 'Save Data Query',
        content: <SaveDataQuery />,
      };
    case 'delete-data-query':
      return {
        title: '',
        content: <DeleteDataQuery />,
      };
    case 'delete-all-data-query':
      return {
        title: '',
        content: <DeleteDataQuery />,
      };
    default:
      return '';
  }
}
