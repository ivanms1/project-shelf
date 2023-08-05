import React, { useEffect } from 'react';
import classNames from 'classnames';
import Image from 'next/future/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';

interface DropzoneProps extends DropzoneOptions {
  currentFile?: any;
  withPreview?: boolean;
  children?: JSX.Element | JSX.Element[];
  dropzoneRef?: React.MutableRefObject<HTMLInputElement>;
  overlayClassName?: string;
  className?: string;
  overlayText?: string;
  imageClassname?: string;
}

const AvatarDropzone = ({
  dropzoneRef,
  currentFile,
  withPreview,
  onDrop,
  children,
  accept,
  maxSize = undefined,
  imageClassname,
  overlayClassName,
  overlayText,
  className,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize,
  });

  const { t } = useTranslation('common');

  useEffect(() => {
    if (dropzoneRef && inputRef?.current) {
      dropzoneRef.current = inputRef?.current;
    }
  }, []);

  return (
    <div
      className={classNames(
        'group relative flex cursor-pointer items-center justify-center border-none',
        className
      )}
      {...getRootProps()}
    >
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
              alt={currentFile?.name || currentFile}
              className={imageClassname}
              fill
            />
            <div
              className={classNames(
                'absolute bottom-0 flex h-full w-full items-center justify-center  bg-[rgba(0,0,0,0.6)] p-3 text-center text-xl opacity-0 transition-opacity group-hover:opacity-100',
                overlayClassName
              )}
            >
              {overlayText || t('select-image')}
            </div>
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
