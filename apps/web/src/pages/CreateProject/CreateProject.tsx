import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, LoaderOverlay } from 'ui';
import { NextSeo } from 'next-seo';

import Dropzone from 'src/components/Dropzone';

import toast from 'react-hot-toast';

import {
  useCreateUserProjectMutation,
  useUploadImageMutation,
  useUpdateProjectMutation,
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
import DetailsFormModal from './DetailsFormModal';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

export const validationSchema = yup.object().shape({
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
  tags: { value: string; label: string }[];
  title: string;
};

function CreateProject({ projectDetails }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { currentUser } = useIsLoggedIn();
  const router = useRouter();

  const {
    getValues,
    watch,
    setValue,
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<FormTypes>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      preview: projectDetails?.preview,
      title: projectDetails?.title,
      description: projectDetails?.description,
      repoLink: projectDetails?.repoLink,
      siteLink: projectDetails?.siteLink,
      tags: projectDetails?.tags?.map((tag) => {
        return {
          value: tag,
          label: tag,
        };
      }),
    },
  });

  const spreadProps = {
    getValues,
    watch,
    setValue,
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isDirty },
  };

  const [createProject, { loading }] = useCreateUserProjectMutation();

  const [updateProject, { loading: updateProjectLoading }] =
    useUpdateProjectMutation();

  const [uploadImage, { loading: imageLoading }] = useUploadImageMutation();

  const onSubmit: SubmitHandler<FormTypes> = async (values) => {
    try {
      const reader = new FileReader();

      if (dirtyFields.preview) {
        reader.readAsDataURL(getValues('preview'));
        reader.onload = async () => {
          const res = await uploadImage({
            variables: {
              path: String(reader.result),
            },
          });

          if (router.pathname == '/create-project') {
            if (res) {
              // create new project
              const createdProjectData = await onCreateProject(values, res);
              if (createdProjectData) {
                router.push(`/user/${currentUser.id}`);
                notifySuccess('Project succesfully created');
              }
            }
          } else {
            const updatedProjectData = await onUpdateProject(
              router.query.id,
              values,
              res?.data?.image
            );

            if (updatedProjectData) {
              router.push(`/user/${currentUser.id}`);
              notifySuccess('Project succesfully updated');
            }
          }
        };
      } else {
        // image not dirty means
        // - update project without image changed
        const updatedProjectData = await onUpdateProject(
          router.query.id,
          values,
          currentImage
        );
        if (updatedProjectData) {
          router.push(`/user/${currentUser?.id}`);
          notifySuccess('Project succesfully updated');
        }
      }
    } catch (error) {
      notifyError();
    }
  };

  const onCreateProject = async (values, res) => {
    const createdData = await createProject({
      variables: {
        input: {
          ...values,
          tags: values.tags.map((tag) => tag.value),
          preview: res?.data?.image,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            getUserProjects(existingProjects, { toReference }) {
              const results = existingProjects.results;
              const reference = toReference(data.createProject);

              return {
                ...existingProjects,
                results: [...results, reference],
              };
            },
          },
        });
      },
    });
    return createdData;
  };

  const onUpdateProject = async (projectId, editedValue, res) => {
    const data = await updateProject({
      variables: {
        projectId: projectId,
        input: {
          ...editedValue,
          preview: res,
          tags: editedValue?.tags.map((tag) => tag.value),
        },
      },
    });
    return data;
  };

  useEffect(() => {
    if (router.pathname == 'project-edit') {
      reset({
        preview: projectDetails?.preview,
        title: projectDetails?.title,
        description: projectDetails?.description,
        repoLink: projectDetails?.repoLink,
        siteLink: projectDetails?.siteLink,
        tags: projectDetails?.tags?.map((tag) => {
          return {
            value: tag,
            label: tag,
          };
        }),
      });
    }
  }, [reset, projectDetails, router.pathname]);

  const currentImage = watch('preview');
  const currentTitle = watch('title');
  const currentDescription = watch('description');

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = () => toast.error('Something went wrong');

  if (updateProjectLoading || loading) {
    return <LoaderOverlay size='lg' />;
  }

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
      <FormProvider {...spreadProps}>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            isLoading={loading || imageLoading}
          />
        </Form>
      </FormProvider>
      <NextSeo
        title={
          router.pathname == 'project-edit' ? 'Edit Project' : 'Create Project'
        }
      />
    </Container>
  );
}

export default CreateProject;
