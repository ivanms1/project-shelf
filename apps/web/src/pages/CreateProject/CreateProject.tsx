import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import DetailsFormModal from './DetailsFormModal';
import Dropzone from '@/components/Dropzone';

import {
  useCreateUserProjectMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import {
  ButtonsContainer,
  Container,
  DescriptionInput,
  Form,
  StyledImageIcon,
  TitleInput,
  UploadContainer,
} from './styles';

const validationSchema = yup.object().shape({
  title: yup.string().required('This is a required field'),
  description: yup.string().required('This is a required field'),
  repoLink: yup
    .string()
    .url('It must be a valid URL')
    .required('This is a required field'),
  siteLink: yup
    .string()
    .url('It must be a valid URL')
    .required('This is a required field'),
  tags: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() }))
    .min(1, 'Add at least one tag')
    .max(5, 'Add no more than five tags'),
  preview: yup.string().required('This is a required field'),
});

export type FormTypes = {
  description: string;
  preview: File;
  repoLink: string;
  siteLink: string;
  tags: { value: string }[];
  title: string;
};

function CreateProject() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const methods = useForm<FormTypes>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const [createProject, { loading }] = useCreateUserProjectMutation();

  const [uploadImage, { loading: imageLoading }] = useUploadImageMutation();

  const onSubmit: SubmitHandler<FormTypes> = async (values) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(methods.getValues('preview'));

      reader.onload = async () => {
        const res = await uploadImage({
          variables: {
            path: String(reader.result),
          },
        });

        const data = await createProject({
          variables: {
            input: {
              ...values,
              tags: values.tags.map((tag) => tag.value),
              preview: res?.data?.image,
            },
          },
        });

        router.push(`/project/${data?.data?.createProject?.id}`);
      };
    } catch (error) {
      // TODO: handle error
    }
  };

  const currentImage = methods.watch('preview');
  const currentTitle = methods.watch('title');
  const currentDescription = methods.watch('description');

  return (
    <Container>
      <ButtonsContainer>
        <Button type='button' variant='secondary'>
          Cancel
        </Button>
        <Button
          disabled={!currentTitle || !currentDescription}
          onClick={() => setIsDetailsModalOpen(true)}
        >
          Continue
        </Button>
      </ButtonsContainer>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          {!currentImage && (
            <>
              <h1>What&apos;s your project</h1>
              <p>Upload a sneak peek of what you&apos;ve built</p>
            </>
          )}
          {currentImage && (
            <TitleInput
              placeholder='Give me a name'
              {...methods.register('title')}
            />
          )}
          <Dropzone
            currentFile={currentImage}
            onDrop={(files) => methods.setValue('preview', files[0])}
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
              {...methods.register('description')}
            />
          )}
          <DetailsFormModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onSubmit={onSubmit}
            isLoading={loading || imageLoading}
          />
        </Form>
      </FormProvider>
      <NextSeo title='Create a Project' />
    </Container>
  );
}

export default CreateProject;
