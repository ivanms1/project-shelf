import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Container } from './style';

export const Dropzone = ({ onDrop, accept = '', disabled = false }) => {
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1, multiple: false, accept, disabled });

  return (
    <Container
      {...getRootProps({
        isDragAccept,
        isDragActive,
        isDragReject,
        className: 'dropzone disabled',
      })}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop here</p>
      ) : disabled ? (
        <p>loading...</p>
      ) : (
        <p>Drag and drop, or click to select files</p>
      )}
    </Container>
  );
};
