import React from 'react';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer';
import DeleteLayer from '@Components/ProjectDashboard/ModalContent/DeleteLayer';

export function getModalTitle(content) {
  switch (content) {
    case 'upload-layer':
      return 'Upload layer';
    default:
      return '';
  }
}

export function getModalContent(content) {
  switch (content) {
    case 'upload-layer':
      return <AddLayer />;
    default:
      return '';
  }
}

export function getPromptDialogTitle(content) {
  switch (content) {
    case 'delete-layer':
      return 'Delete layer';
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
