import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CreateProjectInput, useCreateUserProjectMutation } from 'apollo-hooks';
import { FormInput, Button } from 'ui';

const PREVIEW_PLACEHOLDER =
  'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80';

const validationSchema = yup.object().shape({
  title: yup.string().required('This is a required field'),
  description: yup.string().required('This is a required field'),
});

function EditProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: yupResolver(validationSchema),
  });

  const [createProject] = useCreateUserProjectMutation();

  const onSubmit: SubmitHandler<CreateProjectInput> = async (values) => {
    try {
      const data = await createProject({
        variables: {
          input: {
            ...values,
            tags: ['react', 'node.js'],
            preview: PREVIEW_PLACEHOLDER,
          },
        },
      });

      console.log(`data`, data);
    } catch (error) {
      console.log(`error`, error);
      // TODO: handle error
    }
  };
  console.log(`errors`, errors);

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
        <Button type='submit'>Create</Button>
      </form>
    </div>
  );
}

export default EditProject;
