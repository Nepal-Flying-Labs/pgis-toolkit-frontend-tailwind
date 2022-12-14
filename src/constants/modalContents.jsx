import React from 'react';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer';
import DeleteLayer from '@Components/ProjectDashboard/ModalContent/DeleteLayer';
import SaveAsDraft from '@Components/OrganizationDashboard/ModalContent/SaveAsDraft';
import UploadDataset from '@Components/ProjectDashboard/ModalContent/UploadDataset';
import DataQuery from '@Components/ProjectDashboard/ModalContent/DataQuery';
import Analysis from '@Components/ProjectDashboard/ModalContent/Analysis';
import BufferAnalysis from '@Components/ProjectDashboard/ModalContent/Analysis/BufferAnalysis';
import UploadFailed from '@Components/ProjectDashboard/ModalContent/UploadFailed';

export function getModalTitle(content) {
  switch (content) {
    case 'upload-layer':
      return 'Upload layer';
    case 'upload-dataset':
      return 'Upload your datasets';
    case 'data-query':
      return 'Data Query';
    case 'analysis':
      return 'Analysis';
    case 'buffer-analysis':
      return 'Buffer Analysis';
    default:
      return '';
  }
}

export function getModalContent(content) {
  switch (content) {
    case 'upload-layer':
      return <AddLayer />;
    case 'upload-dataset':
      return <UploadDataset />;
    case 'data-query':
      return <DataQuery />;
    case 'analysis':
      return <Analysis />;
    case 'buffer-analysis':
      return <BufferAnalysis />;
    default:
      return '';
  }
}

export function getPromptDialogTitle(content) {
  switch (content) {
    case 'delete-layer':
      return '';
    case 'upload-failed':
      return '';
    default:
      return '';
  }
}

export function getPromptDialogContent(content) {
  switch (content) {
    case 'delete-layer':
      return <DeleteLayer />;
    case 'save-as-draft':
      return <SaveAsDraft />;
    case 'upload-failed':
      return <UploadFailed />;
    default:
      return '';
  }
}
