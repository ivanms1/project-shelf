import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Wrapper } from './style';

import { ReactComponent as Edit } from '../../../assets/edit.svg';

export const Dropzone = ({ onDrop, accept = '' }) => {
  //todo give warning on invalid file types
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1, multiple: false, accept });

  return (
    <Wrapper {...getRootProps({ isDragAccept, isDragActive, isDragReject })}>
      <input {...getInputProps()} />
      <Edit />
    </Wrapper>
  );
};
