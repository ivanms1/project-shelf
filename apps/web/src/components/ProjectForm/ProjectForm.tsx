import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { type SubmitHandler, useFormContext } from 'react-hook-form';
import { Button } from 'ui';
import { useTranslation } from 'next-i18next';

import Dropzone from 'src/components/Dropzone';
import DetailsFormModal from '@/components/ProjectForm/DetailsFormModal';

import ImageIcon from '@/assets/icons/image.svg';

import type { FormTypes } from 'const';

import RichEditor from 'src/components/RichEditor';

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

  const handleSubmitFn: SubmitHandler<FormTypes> = (values) => {
    onSubmit(values);
  };

  const currentImage = watch('preview');
  const currentTitle = watch('title');
  const currentDescription = watch('description');

  return (
    <div className='flex flex-col bg-black px-28 pb-20 max-lg:flex-col-reverse max-lg:px-[30px] max-lg:pb-10 max-lg:pt-10'>
      <div className='sticky top-0 flex w-full justify-between pt-10'>
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
        className='flex flex-col items-center justify-center'
        onSubmit={handleSubmit(handleSubmitFn)}
      >
        {!currentImage && (
          <>
            <h1 className='mb-4 text-4xl font-semibold'>
              {t('project-question')}
            </h1>
            <p className='mb-10 font-mono text-xl text-grey-light'>
              {t('project-sneak-peek')}
            </p>
          </>
        )}
        {currentImage && (
          <input
            autoFocus
            className='mb-5 w-full max-w-[800px] bg-black text-3xl font-semibold focus:outline-none'
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
          <div className='flex flex-col items-center justify-center'>
            <ImageIcon className='w-20' />
            <p>{t('drag-and-drop')}</p>
          </div>
        </Dropzone>
        {currentImage && (
          // <textarea
          //   className='mt-5 min-h-[100px] w-full max-w-[800px] bg-black font-mono text-xl focus:outline-none'
          //   placeholder={t('description-placeholder')}
          //   {...register('description')}
          // />

          <RichEditor />
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
