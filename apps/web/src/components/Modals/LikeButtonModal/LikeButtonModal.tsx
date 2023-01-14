import React from 'react';

import Image from 'next/image';

import { Modal, Button } from 'ui';

import {
  likeButtonModalStyle,
  likeContentContainer,
  likeTextContent,
  signUpButtonStyle,
  likeButtonContainer,
} from './LikeButtonModal.css';

const LikeButtonModal = ({ isOpen, onClose, ...others }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={likeButtonModalStyle}
      {...others}
    >
      <div className={likeContentContainer}>
        <p className={likeTextContent}>
          To like a project, please Create an account or Login
        </p>
        <Image
          src={'/assets/images/shelf.png'}
          alt='project shelf logo'
          height={300}
          width={300}
        />
      </div>
      <div className={likeButtonContainer}>
        <Button className={signUpButtonStyle}>Sign up</Button>
      </div>
    </Modal>
  );
};

export default LikeButtonModal;
