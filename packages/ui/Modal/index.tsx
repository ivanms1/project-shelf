import * as React from 'react';
import * as ReactModal from 'react-modal';
import classNames from 'classnames';

import { modalStyles, overlayStyles } from './Modal.css';

// @ts-expect-error - TODO: figure out why this fails in the CI
ReactModal.setAppElement('#__next');

interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
  onClose: () => void;
  modalzIndex?: 'confirm' | 'projectModal' | undefined;
}

export const Modal = ({
  children,
  onClose,
  className,
  ...props
}: ModalProps) => {
  return (
    // @ts-expect-error - TODO: figure out why this fails in the CI
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
