import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Button, FormInput, FormSelect, Modal } from 'ui';

import { useTranslation } from 'next-i18next';

import { FormTypes } from 'const';

interface DetailsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormTypes>;
  isLoading: boolean;
}

const DetailsFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: DetailsFormModalProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { t } = useTranslation('project-form');

  return (
    <Modal
      open={isOpen}
      onClose={isLoading ? () => {} : onClose}
      modalClassName='bg-grey-dark'
      contentClassName='p-12 min-w-[600px] max-lg:min-w-0 max-lg:w-screen max-lg:px-4'
    >
      <h1 className='text-2xl font-semibold mb-[30px]'>{t('final-details')}</h1>
      <div className='flex flex-col gap-8 mb-11'>
        <FormInput
          type='url'
          placeholder={t('repo-link')}
          register={register('repoLink')}
          error={errors.repoLink}
        />
        <FormInput
          type='url'
          placeholder={t('site-link')}
          register={register('siteLink')}
          error={errors.siteLink}
        />
        <FormSelect
          isMulti
          control={control}
          name='tags'
          placeholder={t('tags')}
          options={PLACEHOLDER_OPTIONS}
          error={errors.tags}
          register={register('tags')}
        />
      </div>
      <div className='flex justify-between'>
        <Button variant='secondary' onClick={onClose} type='button'>
          {t('common:close')}
        </Button>
        <Button
          type='submit'
          isLoading={isLoading}
          className='min-w-[150px]'
          onClick={handleSubmit(onSubmit)}
        >
          {t('common:submit')}
        </Button>
      </div>
    </Modal>
  );
};

export default DetailsFormModal;

const PLACEHOLDER_OPTIONS = [
  { value: 'React', label: 'React' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Prisma', label: 'Prisma' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'Golang', label: 'Golang' },
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'ExpressJS', label: 'ExpressJS' },
  { value: 'SQL', label: 'SQL' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'Django', label: 'Django' },
  { value: 'Backbone', label: 'Backbone' },
];
