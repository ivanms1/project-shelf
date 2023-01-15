import React, { useEffect } from 'react';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';

import { containerStyle, overlayStyle } from './AvatarDropzone.css';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  label?: string;
  withPreview?: boolean;
  children?: JSX.Element | JSX.Element[];
  dropzoneRef?: React.MutableRefObject<HTMLInputElement>;
  imageClassname?: string;
}

const AvatarDropzone = ({
  dropzoneRef,
  currentFile,
  withPreview,
  onDrop,
  children,
  accept,
  maxSize = null,
  imageClassname,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize,
  });

  const { t } = useTranslation('common');

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
              className={imageClassname}
              layout='fill'
            />
            <div className={overlayStyle}>{t('select-image')}</div>
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
