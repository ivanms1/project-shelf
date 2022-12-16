import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import { Button } from 'ui';

import Dropzone from 'src/components/Dropzone';

import {
  Container,
  ButtonsContainer,
  Form,
  StyledImageIcon,
  UploadContainer,
  DescriptionInput,
  TitleInput,
} from './style';
import DetailsFormModal from '@/pages/CreateProject/DetailsFormModal';

function ProjectForm({ onSubmit, loading }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const router = useRouter();

  const { register, getValues, setValue, watch, handleSubmit } =
    useFormContext();

  const handleSubmitFn = (values) => {
    onSubmit(values, getValues);
  };

  const currentImage = watch('preview');
  const currentTitle = watch('title');
  const currentDescription = watch('description');

  return (
    <Container>
      <ButtonsContainer>
        <Button type='button' variant='secondary' onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          disabled={!currentTitle || !currentDescription}
          onClick={() => setIsDetailsModalOpen(true)}
        >
          Continue
        </Button>
      </ButtonsContainer>
      <Form onSubmit={handleSubmit(handleSubmitFn)}>
        {!currentImage && (
          <>
            <h1>What&apos;s your project</h1>
            <p>Upload a sneak peek of what you&apos;ve built</p>
          </>
        )}
        {currentImage && (
          <TitleInput placeholder='Give me a name' {...register('title')} />
        )}
        <Dropzone
          currentFile={currentImage}
          onDrop={(files) =>
            setValue('preview', files[0], { shouldDirty: true })
          }
          label='Drop your thumbnail'
          withPreview
        >
          <UploadContainer>
            <StyledImageIcon />
            <p>Drag and drop an image or browse</p>
          </UploadContainer>
        </Dropzone>
        {currentImage && (
          <DescriptionInput
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
      </Form>
    </Container>
  );
}

export default ProjectForm;
