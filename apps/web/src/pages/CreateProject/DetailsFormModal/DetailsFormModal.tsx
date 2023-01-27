import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Button, FormInput, FormSelect, Modal } from 'ui';

import { FormTypes } from '../CreateProject';

import { useTranslation } from 'next-i18next';

import {
  buttonsContainerStyle,
  detailsFormModalStyle,
  inputsContainerStyle,
  publishButtonStyle,
  titleStyle,
} from './DetailsFormModal.css';

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
    <Modal open={isOpen} onClose={onClose} className={detailsFormModalStyle}>
      <h1 className={titleStyle}>{t('final-details')}</h1>
      <div className={inputsContainerStyle}>
        <FormInput
          label={t('repo-link')}
          register={register('repoLink')}
          error={errors.repoLink}
        />
        <FormInput
          label={t('site-link')}
          register={register('siteLink')}
          error={errors.siteLink}
        />
        <FormSelect
          isMulti
          control={control}
          name='tags'
          label={t('tags')}
          options={PLACEHOLDER_OPTIONS}
          error={errors.tags}
          register={register('tags')}
        />
      </div>
      <div className={buttonsContainerStyle}>
        <Button variant='secondary' onClick={onClose} type='button'>
          {t('common:close')}
        </Button>
        <Button
          type='submit'
          isLoading={isLoading}
          disabled={isLoading}
          className={publishButtonStyle}
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
