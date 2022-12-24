import React, { useEffect } from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { containerStyle, overlayStyle } from './AvatarDropzone.css';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  children?: JSX.Element | JSX.Element[];
  dropzoneRef?: React.MutableRefObject<HTMLInputElement>;
}

const AvatarDropzone = ({
  dropzoneRef,
  currentFile,
  withPreview,
  onDrop,
  children,
  accept,
  maxSize = null,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize,
  });

  useEffect(() => {
    if (dropzoneRef) {
      dropzoneRef.current = inputRef?.current;
    }
  }, []);

  return (
    <div className={containerStyle} {...getRootProps()}>
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
            <div className={overlayStyle}>Select Image</div>
          </>
        ) : (
          <span>{currentFile?.name}</span>
        )
      ) : (
        children
      )}
    </div>
  );
};

export default AvatarDropzone;
