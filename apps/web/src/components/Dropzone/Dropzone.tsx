import React from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

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
    <div
      className='relative border-2 border-dashed border-grey-light w-[800px] h-[600px] rounded max-lg:w-[335px] max-lg:h-[251px] flex justify-center cursor-pointer'
      {...getRootProps()}
    >
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
