import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@Components/common/Modal';

export default function ModalTwo({
  title,
  show,
  onClose,
  children,
  className,
  zIndex,
}) {
  return (
    <Modal
      show={show}
      title={title}
      onClose={onClose}
      zIndex={zIndex}
      className={className}
    >
      {children}
    </Modal>
  );
}

ModalTwo.defaultProps = {
  title: '',
  show: false,
  onClose: () => {},
  children: '',
  className: '',
  zIndex: '1111111',
};

ModalTwo.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  zIndex: PropTypes.string,
};
