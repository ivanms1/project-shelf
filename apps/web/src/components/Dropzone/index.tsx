import React from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  rejectMessage?: string;
}

function Dropzone({
  onDrop,
  label = 'Drop your file ',
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {currentFile ? (
        withPreview ? (
          <Image
            src={URL.createObjectURL(currentFile)}
            alt={currentFile?.name}
            height={300}
            width={400}
          />
        ) : (
          <span>{currentFile?.name}</span>
        )
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}

export default Dropzone;
