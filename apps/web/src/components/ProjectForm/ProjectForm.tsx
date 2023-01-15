import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui';
import { useTranslation } from 'next-i18next';

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

interface ProjectFormProps {
  onSubmit: (values: FormTypes) => void;
  loading: boolean;
}

const ProjectForm = ({ onSubmit, loading }: ProjectFormProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const router = useRouter();

  const { t } = useTranslation('project-form');

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
          {t('common:cancel')}
        </Button>
        <Button
          disabled={!currentTitle || !currentDescription}
          onClick={() => setIsDetailsModalOpen(true)}
        >
          {t('common:continue')}
        </Button>
      </div>
      <form className={formStyle} onSubmit={handleSubmit(handleSubmitFn)}>
        {!currentImage && (
          <>
            <h1 className={formTitleStyle}>{t('project-question')}</h1>
            <p className={formDescriptionStyle}>{t('project-sneak-peek')}</p>
          </>
        )}
        {currentImage && (
          <input
            autoFocus
            className={titleInputStyle}
            placeholder={t('project-title-placeholder')}
            {...register('title')}
          />
        )}
        <Dropzone
          currentFile={currentImage}
          onDrop={(files) =>
            setValue('preview', files[0], { shouldDirty: true })
          }
          label={t('project-image-label')}
          withPreview
        >
          <div className={uploadContainerStyle}>
            <ImageIcon className={imageIconStyle} />
            <p>{t('drag-and-drop')}</p>
          </div>
        </Dropzone>
        {currentImage && (
          <textarea
            className={descriptionInputStyle}
            placeholder={t('description-placeholder')}
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
