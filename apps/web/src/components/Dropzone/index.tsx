import React, { useEffect } from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { Container, Overlay } from './styles';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  children?: JSX.Element | JSX.Element[];
  dropzoneRef?: React.RefObject<HTMLButtonElement | null>;
}

function Dropzone({
  dropzoneRef,
  onDrop,
  children,
  currentFile,
  withPreview,
  accept,
  editProfile,
  maxSize = null,
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
    <Container editProfile={editProfile} {...getRootProps()}>
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <>
            <Image
              src={
                typeof currentFile == 'object'
                  ? URL.createObjectURL(currentFile)
                  : currentFile
              }
              alt={currentFile?.name}
              layout='fill'
            />
            <Overlay editProfile={editProfile}>Select Image</Overlay>
          </>
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
