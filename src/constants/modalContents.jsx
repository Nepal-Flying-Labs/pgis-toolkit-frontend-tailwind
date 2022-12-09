import React from 'react';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer';
import DeleteLayer from '@Components/ProjectDashboard/ModalContent/DeleteLayer';
import SaveAsDraft from '@Components/OrganizationDashboard/ModalContent/SaveAsDraft';

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
    default:
      return '';
  }
}
