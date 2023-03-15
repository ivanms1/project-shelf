import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui';
import { useTranslation } from 'next-i18next';

import Dropzone from 'src/components/Dropzone';
import DetailsFormModal from '@/components/ProjectForm/DetailsFormModal';

import ImageIcon from '@/assets/icons/image.svg';

import type { FormTypes } from '@/pages/ProjectEdit/ProjectEdit';

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
    <div className='bg-black flex flex-col px-28 pb-20 max-lg:px-[30px] max-lg:pb-10 max-lg:pt-10 max-lg:flex-col-reverse'>
      <div className='flex justify-between sticky top-0 pt-10 w-full'>
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
      <form
        className='flex flex-col justify-center items-center'
        onSubmit={handleSubmit(handleSubmitFn)}
      >
        {!currentImage && (
          <>
            <h1 className='text-4xl font-semibold mb-4'>
              {t('project-question')}
            </h1>
            <p className='text-grey-light text-xl font-mono mb-10'>
              {t('project-sneak-peek')}
            </p>
          </>
        )}
        {currentImage && (
          <input
            autoFocus
            className='bg-black text-3xl max-w-[800px] mb-5 w-full font-semibold focus:outline-none'
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
          accept='image/*'
          withPreview
        >
          <div className='flex flex-col justify-center items-center'>
            <ImageIcon className='w-20' />
            <p>{t('drag-and-drop')}</p>
          </div>
        </Dropzone>
        {currentImage && (
          <textarea
            className='bg-black max-w-[800px] w-full min-h-[100px] mt-5 text-xl font-mono focus:outline-none'
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
