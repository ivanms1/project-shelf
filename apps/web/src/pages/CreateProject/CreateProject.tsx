import React from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextSeo } from 'next-seo';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import type { FetchResult } from '@apollo/client';

import ProjectForm from 'src/components/ProjectForm';

import {
  UploadImageMutation,
  useCreateUserProjectMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { projectValidationSchema } from 'const';

const notifySuccess = () => toast.success('Project created successfully');
const notifyError = () => toast.error('Something went wrong');

export type FormTypes = {
  description: string;
  preview: File;
  repoLink: string;
  siteLink: string;
  tags: { value: string; label: string }[];
  title: string;
};

function CreateProject() {
  const { currentUser } = useIsLoggedIn();
  const router = useRouter();
  const { t } = useTranslation('create-project');
  const methods = useForm<FormTypes>({
    resolver: zodResolver(projectValidationSchema),
  });

  const [uploadImage, { loading: imageLoading }] = useUploadImageMutation();
  const [createProject, { loading }] = useCreateUserProjectMutation();

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
        if (res) {
          const createdProjectData = await onCreateProject(values, res);
          if (createdProjectData) {
            router.push(`/user/${currentUser.id}`);
            notifySuccess();
          }
        }
      };
    } catch (error) {
      notifyError();
    }
  };

  const onCreateProject = async (
    values: FormTypes,
    res: FetchResult<UploadImageMutation>
  ) => {
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

  return (
    <>
      <FormProvider {...methods}>
        <ProjectForm onSubmit={onSubmit} loading={loading || imageLoading} />
      </FormProvider>
      <NextSeo title={t('seo-title')} description={t('seo-description')} />
    </>
  );
}

CreateProject.auth = true;

export default CreateProject;
