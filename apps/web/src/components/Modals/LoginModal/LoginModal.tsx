import React from 'react';

import { signIn } from 'next-auth/react';
import Image from 'next/future/image';

import { Modal, Button } from 'ui';

import {
  likeButtonModalStyle,
  likeContentContainer,
  likeContentInnerTextContainer,
  likeTextContent,
  signUpButtonStyle,
  likeButtonContainer,
  projectShelfImage,
} from './LoginModal.css';

const LoginModal = ({ isOpen, onClose, ...others }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={likeButtonModalStyle}
      {...others}
    >
      <div className={likeContentContainer}>
        <p className={likeTextContent}>
          Please create an account or login for this action
        </p>
        <div className={likeContentInnerTextContainer}>
          <div>
            <h3>Discover the coolest projects</h3>
            <p>Sign in to discover new projects and interact</p>
          </div>

          <Image
            src={'/assets/images/shelf.png'}
            alt='project shelf logo'
            width={550}
            height={550}
            className={projectShelfImage}
          />
        </div>
      </div>
      <div className={likeButtonContainer}>
        <Button onClick={() => signIn('github')} className={signUpButtonStyle}>
          Login
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
