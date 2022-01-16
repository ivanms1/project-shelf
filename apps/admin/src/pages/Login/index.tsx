import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, FormInput } from 'ui';

import { useLoginUserMutation } from 'apollo-hooks';

import { setAuthToken } from '@/helpers/getAuthToken';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('This is a required field')
    .email('Email must be valid'),
  password: yup
    .string()
    .required('This is a required field')
    .min(6, 'Password must be more than 6 characters'),
});

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const [login] = useLoginUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      setAuthToken(res?.data?.login?.userId);
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Email'
          register={register('email')}
          error={errors.email}
        />
        <FormInput
          type='password'
          label='Password'
          register={register('password')}
          error={errors.password}
        />
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
}

export default Login;
