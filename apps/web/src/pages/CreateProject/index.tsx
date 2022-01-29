import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  useCreateUserProjectMutation,
  useUploadImageMutation,
} from 'apollo-hooks';
import { FormInput, Button } from 'ui';
import { useRouter } from 'next/router';
import Dropzone from 'src/components/Dropzone';

const validationSchema = yup.object().shape({
  title: yup.string().required('This is a required field'),
  description: yup.string().required('This is a required field'),
  repoLink: yup.string().required('This is a required field'),
  siteLink: yup.string().required('This is a required field'),
  tags: yup.array().of(yup.string()).min(1, 'Add at least one tag'),
  preview: yup.string().required('This is a required field'),
});

type FormTypes = {
  description: string;
  preview: File;
  repoLink: string;
  siteLink: string;
  tags: string[];
  title: string;
};

function CreateProject() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const [createProject] = useCreateUserProjectMutation();

  const [uploadImage] = useUploadImageMutation();

  const onSubmit: SubmitHandler<FormTypes> = async (values) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(getValues('preview'));

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
              tags: ['react', 'node.js'],
              preview: res?.data?.image?.url,
            },
          },
        });

        router.push(`/project/${data?.data?.createProject?.id}`);
      };
    } catch (error) {
      // TODO: handle error
    }
  };

  const currentImage = watch('preview');

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Title'
          register={register('title')}
          error={errors.title}
        />
        <FormInput
          label='Description'
          register={register('description')}
          error={errors.description}
        />
        <FormInput
          label='Repository Link'
          register={register('repoLink')}
          error={errors.repoLink}
        />
        <FormInput
          label='Live Site Link'
          register={register('siteLink')}
          error={errors.siteLink}
        />

        <Dropzone
          currentFile={currentImage}
          onDrop={(files) => setValue('preview', files[0])}
          label='Drop your thumbnail'
          withPreview
        />

        <Button type='submit'>Create</Button>
      </form>
    </div>
  );
}

export default CreateProject;
