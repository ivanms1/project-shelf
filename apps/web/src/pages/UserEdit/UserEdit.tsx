import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetCurrentUserQuery } from 'apollo-hooks';

import { Container } from './style';
import { NextSeo } from 'next-seo';

import EditProfileFormModal from './EditProfileForm';

const UserEdit = () => {
  const { data } = useGetCurrentUserQuery();

  const methods = useForm();

  return (
    <Container>
      <FormProvider {...methods}>
        <EditProfileFormModal userDetails={data?.getCurrentUser} />
      </FormProvider>
      <NextSeo title='Edit Profile | Project-shelf'></NextSeo>
    </Container>
  );
};

export default UserEdit;
