import React from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { containerStyle } from './Dropzone.css';

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
    <div className={containerStyle} {...getRootProps()}>
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <Image
            src={
              typeof currentFile === 'string'
                ? currentFile
                : URL.createObjectURL(currentFile)
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
    </div>
  );
}

export default Dropzone;
