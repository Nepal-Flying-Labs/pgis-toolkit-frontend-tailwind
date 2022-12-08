import React from 'react';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer';
import DeleteLayer from '@Components/ProjectDashboard/ModalContent/DeleteLayer';
import UploadDataset from '@Components/ProjectDashboard/ModalContent/UploadDataset';

export function getModalTitle(content) {
  switch (content) {
    case 'upload-layer':
      return 'Upload layer';
    case 'upload-dataset':
      return 'Upload your datasets';
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
    default:
      return '';
  }
}

export function getPromptDialogTitle(content) {
  switch (content) {
    case 'delete-layer':
      return '';
    default:
      return '';
  }
}

export function getPromptDialogContent(content) {
  switch (content) {
    case 'delete-layer':
      return <DeleteLayer />;
    default:
      return '';
  }
}
