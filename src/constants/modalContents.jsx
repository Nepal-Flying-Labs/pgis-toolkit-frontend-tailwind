import React from 'react';
import AddLayer from '@Components/ProjectDashboard/ModalContent/AddLayer/index';

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
