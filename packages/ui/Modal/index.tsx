import * as React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import { modalStyles, overlayStyles } from './Modal.css';

ReactModal.setAppElement('#__next');

interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({
  children,
  onClose,
  className,
  ...props
}: ModalProps) => {
  return (
    <ReactModal
      overlayClassName={overlayStyles}
      onRequestClose={onClose}
      className={classNames(modalStyles, className)}
      closeTimeoutMS={300}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
