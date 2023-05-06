import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderOverlay } from 'ui';

import ProjectForm from '@/components/ProjectForm';

import {
  useGetProjectQuery,
  useUpdateProjectMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import { type FormTypes, projectValidationSchema } from 'const';

const notifySuccess = () => toast.success('Project edited successfully');
const notifyError = () => toast.error('Something went wrong');

const ProjectEdit = () => {
  const { query, push } = useRouter();

  const { data } = useGetProjectQuery({
    variables: {
      id: String(query.id),
    },
    skip: !query.id,
  });

  const [uploadImage] = useUploadImageMutation();
  const [updateProject, { loading: updateProjectLoading }] =
    useUpdateProjectMutation();

  const defaultValues = {
    preview: data?.project?.preview,
    title: data?.project?.title,
    description: data?.project?.description,
    repoLink: data?.project?.repoLink,
    siteLink: data?.project?.siteLink,
    tags: data?.project?.tags?.map((tag) => {
      return {
        value: tag,
        label: tag,
      };
    }),
  };

  const methods = useForm<FormTypes>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormTypes> = async (values) => {
    try {
      if (
        methods.getValues('preview') !== data?.project?.preview &&
        typeof values.preview !== 'string'
      ) {
        const reader = new FileReader();

        reader.readAsDataURL(methods.getValues('preview') as File);
        reader.onload = async () => {
          const res = await uploadImage({
            variables: {
              path: String(reader.result),
            },
          });
          if (res) {
            const updatedProjectData = await onUpdateProject(
              values,
              res?.data?.image
            );
            if (updatedProjectData) {
              push(`/user/${data?.project?.author?.id}`);
              notifySuccess();
            }
          }
        };
      } else {
        const updatedProjectData = await onUpdateProject(
          values,
          values.preview as string
        );
        if (updatedProjectData) {
          push(`/user/${data?.project?.author?.id}`);
          notifySuccess();
        }
      }
    } catch (error) {
      notifyError();
    }
  };

  const onUpdateProject = async (
    editedValue: FormTypes,
    res: string | undefined
  ) => {
    const data = await updateProject({
      variables: {
        projectId: String(query.id),
        input: {
          ...editedValue,
          preview: res || '',
          tags: editedValue?.tags.map((tag) => tag.value),
        },
      },
    });
    return data;
  };

  useEffect(() => {
    methods.reset({
      preview: data?.project?.preview,
      title: data?.project?.title,
      description: data?.project.description,
      repoLink: data?.project?.repoLink,
      siteLink: data?.project?.siteLink,
      tags: data?.project?.tags?.map((tag) => {
        return {
          value: tag,
          label: tag,
        };
      }),
    });
  }, [methods, methods.reset, data, query.id]);

  if (updateProjectLoading) {
    return <LoaderOverlay size='lg' />;
  }

  return (
    <>
      <FormProvider {...methods}>
        <ProjectForm onSubmit={onSubmit} loading={updateProjectLoading} />
      </FormProvider>
      <NextSeo
        title={data?.project.title}
        description={data?.project?.description}
      />
    </>
  );
};

ProjectEdit.auth = true;

export default ProjectEdit;
