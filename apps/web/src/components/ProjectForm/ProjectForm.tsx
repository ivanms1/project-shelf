import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui';

import Dropzone from 'src/components/Dropzone';
import DetailsFormModal from '@/pages/CreateProject/DetailsFormModal';

import ImageIcon from '@/assets/icons/image.svg';

import type { FormTypes } from '@/pages/ProjectEdit/ProjectEdit';

import {
  buttonsContainerStyle,
  descriptionInputStyle,
  formDescriptionStyle,
  formStyle,
  formTitleStyle,
  imageIconStyle,
  titleInputStyle,
  uploadContainerStyle,
} from './ProjectForm.css';
import { useTranslation } from 'react-i18next';

interface ProjectFormProps {
  onSubmit: (values: FormTypes) => void;
  loading: boolean;
}

const ProjectForm = ({ onSubmit, loading }: ProjectFormProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const router = useRouter();

  const { t } = useTranslation('create-project');

  const { register, setValue, watch, handleSubmit } =
    useFormContext<FormTypes>();

  const handleSubmitFn = (values) => {
    onSubmit(values);
  };

  const currentImage = watch('preview');
  const currentTitle = watch('title');
  const currentDescription = watch('description');

  return (
    <div>
      <div className={buttonsContainerStyle}>
        <Button type='button' variant='secondary' onClick={() => router.back()}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={!currentTitle || !currentDescription}
          onClick={() => setIsDetailsModalOpen(true)}
        >
          {t('Continue')}
        </Button>
      </div>
      <form className={formStyle} onSubmit={handleSubmit(handleSubmitFn)}>
        {!currentImage && (
          <>
            <h1 className={formTitleStyle}>What&apos;s your project</h1>
            <p className={formDescriptionStyle}>
              Upload a sneak peek of what you&apos;ve built
            </p>
          </>
        )}
        {currentImage && (
          <input
            className={titleInputStyle}
            placeholder='Give me a name'
            {...register('title')}
          />
        )}
        <Dropzone
          currentFile={currentImage}
          onDrop={(files) =>
            setValue('preview', files[0], { shouldDirty: true })
          }
          label='Drop your thumbnail'
          withPreview
        >
          <div className={uploadContainerStyle}>
            <ImageIcon className={imageIconStyle} />
            <p>Drag and drop an image or browse</p>
          </div>
        </Dropzone>
        {currentImage && (
          <textarea
            className={descriptionInputStyle}
            placeholder='Add a brief description about your project and what went into creating it'
            {...register('description')}
          />
        )}
        <DetailsFormModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSubmit={onSubmit}
          isLoading={loading}
        />
      </form>
    </div>
  );
};

export default ProjectForm;
