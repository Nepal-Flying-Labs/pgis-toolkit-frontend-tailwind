import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@Components/common/Modal';

export default function PromptDialog({ title, show, onClose, children }) {
  return (
    <Modal show={show} title={title} onClose={onClose}>
      {children}
    </Modal>
  );
}

PromptDialog.defaultProps = {
  title: '',
  show: false,
  onClose: () => {},
  children: '',
};

PromptDialog.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
