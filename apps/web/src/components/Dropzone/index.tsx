import React, { useEffect } from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Container } from './styles';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  children?: React.ReactNode;
  dropzoneRef?: React.Ref<HTMLButtonElement>;
  editProfile?: boolean;
}

function Dropzone({
  dropzoneRef,
  onDrop,
  children,
  currentFile,
  withPreview,
  accept,
  maxSize = null,
  ...props
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize,
  });

  useEffect(() => {
    if (dropzoneRef) {
      dropzoneRef.current = getInputProps().ref.current;
    }
  }, []);

  return (
    <Container {...getRootProps()} {...props}>
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <Image
            src={
              typeof currentFile == 'object'
                ? URL.createObjectURL(currentFile)
                : currentFile
            }
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
