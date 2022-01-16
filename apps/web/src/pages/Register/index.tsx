import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormInput, Button } from 'ui';

import { useRegisterUserMutation } from 'apollo-hooks';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('This is a required field')
    .min(3, 'First name must have more than 3 characters'),
  email: yup
    .string()
    .required('This is a required field')
    .email('Email must be valid'),
  password: yup
    .string()
    .required('This is a required field')
    .min(6, 'Password must be more than 6 characters'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const [registerUser] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await registerUser({
        variables: {
          email: data.email,
          password: data.password,
          name: data.firstName,
        },
      });
      console.log(`res`, res);
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='First Name'
          register={register('firstName')}
          error={errors.firstName}
        />
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
        <FormInput
          type='password'
          label='Confirm Password'
          register={register('confirmPassword')}
          error={errors.confirmPassword}
        />
        <Button type='submit'>Register</Button>
      </form>
    </div>
  );
}

export default Register;
