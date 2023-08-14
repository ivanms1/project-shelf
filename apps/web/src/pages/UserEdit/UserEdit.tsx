import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as zod from 'zod';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, FormTextArea } from 'ui';
import {
  UploadImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import AvatarDropzone from 'src/components/AvatarDropzone';
import Layout from '@/components/Layout';
import AuthProvider from '@/components/AuthProvider';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import fileReader from '@/helpers/fileReader';

import type { FetchResult } from '@apollo/client';
import type { NextPageWithLayout } from 'pages/_app';

const COVER_PLACEHOLDER = 'https://via.placeholder.com/1665x288';

type ImageResultType =
  | FetchResult<UploadImageMutation, Record<string, any>, Record<string, any>>
  | string;

type FormTypes = {
  preview: File | string;
  cover: File | string;
  profileName: string;
  profileLocation: string;
  profileDiscord: string;
  profileWebsite: string;
  profileBio: string;
  profileTwitter: string;
};

const validationSchema = zod
  .object({
    profileName: zod.string({
      required_error: 'This is required field',
    }),
    profileWebsite: zod
      .string()
      .url('It must be a valid URL')
      .optional()
      .or(zod.literal('')),
  })
  .required();

const UserEdit: NextPageWithLayout = () => {
  const { currentUser } = useIsLoggedIn();

  const { t } = useTranslation('user-edit');

  const userDetails = currentUser;
  const userId = userDetails?.id;

  const router = useRouter();
  const defaultValues = {
    preview: userDetails?.avatar ?? '',
    cover: userDetails?.cover ?? '',
    profileName: userDetails?.name ?? '',
    profileBio: userDetails?.bio ?? '',
    profileLocation: userDetails?.location ?? '',
    profileWebsite: userDetails?.website ?? '',
    profileTwitter: userDetails?.twitter ?? '',
    profileDiscord: userDetails?.discord ?? '',
  };

  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<FormTypes>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [uploadImage, { loading: imageUploading }] = useUploadImageMutation();

  useEffect(() => {
    reset(defaultValues);
  }, [userDetails, reset]);

  const notifySuccess = () => toast.success(t('edit-success'));
  const notifyError = () => toast.error(t('edit-failure'));

  const onSubmit: SubmitHandler<FormTypes> = async () => {
    if (!isDirty) {
      router.push(`/user/${userId}`);
      return;
    }

    if (!dirtyFields.cover && !dirtyFields.preview) {
      return updateUserVariables([
        getValues('preview') as string,
        getValues('cover') as string,
      ]);
    }

    // Use Promise.all and map to upload both images at the same time.
    const urls = await Promise.all(
      [getValues('preview'), getValues('cover')].map(async (file) => {
        if (typeof file === 'string') return file;
        const reader = await fileReader(file as File);
        if (!reader) return;
        const res = await uploadImage({
          variables: {
            path: String(reader),
          },
        });

        return res;
      })
    );

    return updateUserVariables(urls.filter(Boolean) as ImageResultType[]);
  };

  const updateUserVariables = async (urls: ImageResultType[]) => {
    try {
      const {
        profileName: name,
        profileBio: bio,
        profileDiscord: discord,
        profileWebsite: website,
        profileTwitter: twitter,
        profileLocation: location,
      } = getValues();

      await updateUser({
        variables: {
          input: {
            name,
            bio,
            discord,
            website,
            twitter,
            location,
            avatar:
              typeof urls[0] === 'string' ? urls[0] : urls[0]?.data?.image,
            cover: typeof urls[1] === 'string' ? urls[1] : urls[1]?.data?.image,
          },
        },
      });

      notifySuccess();
      router.push(`/user/${userId}`);
    } catch {
      notifyError();
    }
  };

  const currentImage = watch('preview');
  const currentCover = watch('cover');

  return (
    <div className='flex items-center justify-center bg-black '>
      <form
        className='mb-10 flex w-full flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <AvatarDropzone
          currentFile={currentCover || COVER_PLACEHOLDER}
          onDrop={(files) => {
            setValue('cover', files[0], { shouldDirty: true });
          }}
          overlayText={t('cover-label')}
          accept='image/*'
          className='relative h-72 w-full'
          imageClassname='object-cover'
          withPreview
        />
        <AvatarDropzone
          accept='image/*'
          overlayText={t('avatar-label')}
          currentFile={currentImage}
          onDrop={(files) => {
            setValue('preview', files[0], { shouldDirty: true });
          }}
          className='z-10 -mt-[100px] h-[200px] w-[200px]'
          imageClassname='object-cover rounded-full'
          overlayClassName='rounded-full'
          withPreview
        />

        <div className='flex w-full max-w-4xl flex-col gap-5 px-[30px]'>
          <FormInput
            label={t('name')}
            register={register('profileName')}
            error={errors.profileName}
          />
          <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
            <FormInput
              label={t('location')}
              register={register('profileLocation')}
            />
            <FormInput
              label={t('website')}
              register={register('profileWebsite')}
              error={errors.profileWebsite}
            />
            <FormInput
              label={t('twitter')}
              register={register('profileTwitter')}
              placeholder='@revengeZi'
            />
            <FormInput
              label={t('discord')}
              register={register('profileDiscord')}
              placeholder='uzamaki21#0951'
            />
          </div>

          <FormTextArea
            label={t('bio')}
            type='text'
            register={register('profileBio')}
          />
          <span className='text-sm text-grey-light'>
            {t('bio-description')}
          </span>
          <div className='flex justify-end'>
            <Button
              variant='primary'
              isLoading={updateUserLoading || imageUploading}
              className='flex min-w-[200px] justify-center'
              type='submit'
            >
              {t('save-profile')}
            </Button>
          </div>
        </div>
      </form>
      <NextSeo title={t('seo-title')}></NextSeo>
    </div>
  );
};

UserEdit.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthProvider>
      <Layout>{page}</Layout>
    </AuthProvider>
  );
};

export default UserEdit;
