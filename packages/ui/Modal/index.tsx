import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import { modal, overlay, StyledModal } from './styles';

interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
  onClose: () => void;
  modalzIndex?: 'confirm' | 'projectModal' | undefined;
}

export const Modal = ({
  children,
  onClose,
  className,
  modalzIndex,
  ...props
}: ModalProps) => {
  return (
    <StyledModal
      modalzIndex={modalzIndex}
      overlayClassName={overlay().className}
      onRequestClose={onClose}
      className={classNames(modal(), className)}
      closeTimeoutMS={300}
      {...props}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
