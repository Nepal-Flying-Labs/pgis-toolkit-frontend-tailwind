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
import EditLayer from '@Components/ProjectDashboard/ModalContent/EditLayer';
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
import UploadDocument from '@Components/ProjectDashboard/ModalContent/UploadDocument';
import ImportOSM from '@Components/ProjectDashboard/ModalContent/ImportOSM';
import EditDocument from '@Components/ProjectDashboard/ModalContent/EditDocument';
import SaveDataQuery from '@Components/ProjectDashboard/ModalContent/SaveDataQuery';
import DeleteDataQuery from '@Components/ProjectDashboard/ModalContent/DeleteDataQuery';
import AccountSettings from '@Components/Authentication/ModalContent/AccountSettings';
import ViewLayerAttribute from '@Components/ProjectDashboard/ModalContent/ViewLayerAttribute';
import EditLayerAttribute from '@Components/ProjectDashboard/ModalContent/EditLayerAttribute';
import DeleteLayerAttribute from '@Components/ProjectDashboard/ModalContent/DeleteLayerAttribute';
import DeleteDocument from '@Components/ProjectDashboard/ModalContent/DeleteDocument/index';
import DataQueryHelp from '@Components/ProjectDashboard/ModalContent/HelpContents/DataQueryHelp';
import DeleteGallery from '@Components/ProjectDashboard/ModalContent/DeleteGallery/index';
import EditGallery from '@Components/ProjectDashboard/ModalContent/EditGallery/index';
import UploadGallery from '@Components/ProjectDashboard/ModalContent/UploadGallery/index';
import DeleteOrganizationUser from '@Components/OrganizationDashboard/ModalContent/DeleteOrganizationUser';
import DeleteUser from '@Components/Users/ModalContent/DeleteUser';
import DeleteProjectUser from '@Components/ProjectDashboard/ModalContent/DeleteProjectUser/index';
import DeleteProject from '@Components/OrganizationDashboard/ModalContent/DeleteProject';
import DeleteTemplateAttribute from '@Components/ProjectDashboard/ModalContent/DeleteTemplateAttribute';
import DeleteError from '@Components/ProjectDashboard/Analysis/ModalContent/DeleteError';
import ViewRouteAttribute from '@Components/ProjectDashboard/Analysis/ModalContent/ViewRouteAttribute';
import ViewBufferAttribute from '@Components/ProjectDashboard/Analysis/ModalContent/ViewBufferAttribute';
import DeleteAnOrganization from '@Components/Organizations/ModalContent/DeleteAnOrganization';
import SaveRouteLayer from '@Components/ProjectDashboard/Analysis/ModalContent/SaveRouteLayer';
import SaveBufferLayer from '@Components/ProjectDashboard/Analysis/ModalContent/SaveBufferLayer';
import SelectLayerFeature from '@Components/ProjectDashboard/Analysis/ModalContent/SelectLayerFeature';
import AddDatasetCategory from '@Components/ProjectDashboard/ModalContent/AddDatasetCategory/index';
import DeleteBufferResult from '@Components/ProjectDashboard/Analysis/ModalContent/DeleteBufferResult/index';
import DeleteRouteResult from '@Components/ProjectDashboard/Analysis/ModalContent/DeleteRouteResult/index';
import SaveManualFix from '@Components/ProjectDashboard/Analysis/ModalContent/SaveManualFix';
import SignoutWarning from '@Components/OrganizationDashboard/ModalContent/SignoutWarning';
import DownloadTemplate from '@Components/ProjectDashboard/ModalContent/DownloadTemplate/index';
import UploadBulkImage from '@Components/ProjectDashboard/ModalContent/UploadBulkImage/index';
import DeleteDropdownOption from '@Components/ProjectDashboard/ModalContent/DeleteDropdownOption/index';

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
        title: 'Basic Project Setup & Invitation',
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

    case 'edit-layer':
      return {
        title: 'Edit Layer',
        content: <EditLayer />,
        // className: '!naxatw-h-[calc(100vh-30rem)]',
      };
    case 'upload-dataset':
      return {
        title: 'Upload your datasets',
        content: <UploadDataset />,
        subtitle:
          'USAFIRI allows you to import data in different formats(shp, csv, geojson or gpkg file format). Please upload your datasets below.',
      };
    case 'view-layer-attribute':
      return {
        title: 'Layer Attribute',
        content: <ViewLayerAttribute />,
        className: '!naxatw-w-[calc(100vw-10rem)]',
      };
    case 'view-query-attribute':
      return {
        title: 'Layer Attribute',
        content: <ViewLayerAttribute />,
        className: '!naxatw-w-[calc(100vw-10rem)]',
      };
    case 'data-query':
      return {
        title: 'Data Query',
        subtitle:
          'This tool allows you to query on the layers and create a new layers based on the query result.',
        content: <DataQuery />,
        className: '!naxatw-w-[63.25rem]',
        helpContent: <DataQueryHelp />,
      };
    case 'analysis':
      return {
        title: 'Analysis',
        content: <Analysis />,
        subtitle:
          'USAFIRI allows you to do different sorts of spatial analysis with the existing datasets in the project. Below are some of the analysis functions we have in the tool at the moment.',
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
        subtitle:
          'USAFIRI allows you to do different sorts of analysis with your map datasets. Below are some of the analysis functions we have in the tool at the moment.',
      };

    // project gallery
    case 'upload-image':
      return {
        title: 'Upload your image',
        subtitle:
          'You can add any sort of relevant photographs & images or maps, in file format JPEG, PNG, GIF or PDF.',
        content: <UploadGallery />,
      };

    case 'edit-image':
      return {
        title: 'Edit your image',
        subtitle:
          'You can add any sort of relevant photographs & images or maps, in file format JPEG, PNG, GIF or PDF.',
        content: <EditGallery />,
      };

    // project document
    case 'upload-document':
      return {
        title: 'Upload your documents',
        subtitle:
          'You can add any sort of relevant documents to the project. It includes relevant report, findings etc. in file format DOCX, PDF, Excel or CSV.',
        content: <UploadDocument />,
      };

    case 'edit-document':
      return {
        title: 'Edit your documents',
        subtitle:
          'You can add any sort of relevant documents to the project. It includes relevant report, findings etc. in file format DOCX, PDF, Excel or CSV.',
        content: <EditDocument />,
      };

    // manage data
    case 'add-wms-layer':
      return {
        title: 'Add WMS Layer',
        content: <AddWMSLayer />,
        subtitle:
          'To add a WMS layer to the system, please provide the WMS endpoint URL and the desired layer name.',
      };
    case 'manage-attributes':
      return {
        title: 'Manage Attributes',
        content: <ManageAttributes />,
        className: '!naxatw-w-[56.25rem] !naxatw-max-h-[calc(100vh-10rem)]',
      };
    case 'add-attributes':
      return {
        title: 'Add Attributes',
        content: <AddAttributes />,
        className: '!naxatw-w-[56.25rem]',
      };

    // data cleaning
    case 'save-manual-fix':
      return {
        title: '',
        content: <SaveManualFix />,
        hideCloseButton: true,
      };

    // route analysis
    case 'view-route-attribute':
      return {
        title: 'Route Attribute',
        content: <ViewRouteAttribute />,
        className: '!naxatw-w-[50rem]',
      };
    case 'select-layer-feature':
      return {
        title: 'Select Layer Feature',
        content: <SelectLayerFeature />,
        className: '!naxatw-w-[calc(100vw-15rem)]',
      };

    // buffer analysis
    case 'view-buffer-attribute':
      return {
        title: 'Attribute Table',
        content: <ViewBufferAttribute />,
        className: '!naxatw-w-[50rem]',
      };

    case 'download-template':
      return {
        title: 'Download Template',
        content: <DownloadTemplate />,
      };

    case 'upload-bulk-image':
      return {
        title: 'Upload Images',
        content: <UploadBulkImage />,
        subtitle:
          'USAFIRI allows you to bulk upload images for a layer in zip file format.',
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
        title: 'Delete',
        content: <DeleteDocument />,
      };
    case 'delete-gallery':
      return {
        title: 'Delete',
        content: <DeleteGallery />,
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
    case 'delete-organization-user':
      return {
        title: 'Delete User',
        content: <DeleteOrganizationUser />,
      };
    case 'delete-organization-invited-user':
      return {
        title: 'Delete User',
        content: <DeleteOrganizationUser />,
      };
    case 'delete-user':
      return {
        title: 'Delete User',
        content: <DeleteUser />,
      };
    case 'delete-invited-user':
      return {
        title: 'Delete User',
        content: <DeleteUser />,
      };
    case 'delete-project-user':
      return {
        title: 'Delete User',
        content: <DeleteProjectUser />,
      };
    case 'delete-project-invited-user':
      return {
        title: 'Delete User',
        content: <DeleteProjectUser />,
      };
    case 'delete-template-attribute':
      return {
        title: 'Delete Attribute',
        content: <DeleteTemplateAttribute />,
      };
    // data cleaning > manual fix
    case 'delete-error':
      return {
        title: '',
        content: <DeleteError />,
      };

    case 'delete-project':
      return {
        title: 'Delete Project',
        content: <DeleteProject />,
      };
    case 'delete-an-organization':
      return {
        title: 'Delete an organization',
        content: <DeleteAnOrganization />,
      };
    // route analysis
    case 'save-route-layer':
      return {
        title: 'Save Layer',
        content: <SaveRouteLayer />,
      };

    // buffer analysis
    case 'save-buffer-layer':
      return {
        title: 'Save Layer',
        content: <SaveBufferLayer />,
      };

    case 'delete-layer-attribute':
      return {
        title: 'Delete attribute',
        content: <DeleteLayerAttribute />,
      };

    case 'delete-buffer-result':
      return {
        title: '',
        content: <DeleteBufferResult />,
      };

    case 'delete-route-result':
      return {
        title: '',
        content: <DeleteRouteResult />,
      };

    case 'signout-warning':
      return {
        title: '',
        content: <SignoutWarning />,
      };

    case 'delete-dropdown-option':
      return {
        title: '',
        content: <DeleteDropdownOption />,
      };

    default:
      return '';
  }
}

export function getModalTwoContent(content) {
  switch (content) {
    // authentication
    case 'edit-layer-attribute':
      return {
        title: 'Edit Attribute',
        content: <EditLayerAttribute />,
      };
    case 'add-dataset-category':
      return {
        title: 'Add Category',
        content: <AddDatasetCategory />,
      };
    default:
      return {
        title: '',
        content: '',
      };
  }
}
