import React from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Container } from './styles';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  children?: React.ReactNode;
}

function Dropzone({
  onDrop,
  children,
  currentFile,
  withPreview,
  accept,
  maxSize = null,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <Image
            src={URL.createObjectURL(currentFile)}
            alt={currentFile?.name}
            layout='fill'
          />
        ) : (
          <span>{currentFile?.name}</span>
        )
      ) : (
        children
      )}
    </Container>
  );
}

export default Dropzone;
