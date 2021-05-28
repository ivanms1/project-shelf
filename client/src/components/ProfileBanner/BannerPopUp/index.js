import React from 'react';

import Button from '../../Button';

import { StyledModal, Body, Title, CustomDONE } from './style';

const BannerPopUp = ({ isOpen, onRequestClose, children }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <Title>Crop your Image</Title>
      <Body>{children}</Body>
      <Button
        addCSS={CustomDONE}
        onClick={() => {
          onRequestClose();
        }}
      >
        Done
      </Button>
    </StyledModal>
  );
};

export default BannerPopUp;
