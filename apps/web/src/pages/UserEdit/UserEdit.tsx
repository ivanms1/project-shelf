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

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import AvatarDropzone from 'src/components/AvatarDropzone';

import fileReader from '@/helpers/fileReader';

import type { FetchResult } from '@apollo/client';

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

const UserEdit = () => {
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

    return updateUserVariables(urls);
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
    <div className='bg-black flex justify-center items-center '>
      <form
        className='flex flex-col w-full items-center mb-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <AvatarDropzone
          currentFile={currentCover || COVER_PLACEHOLDER}
          onDrop={(files) => {
            setValue('cover', files[0], { shouldDirty: true });
          }}
          overlayText={t('cover-label')}
          accept='image/*'
          className='relative w-full h-72'
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
          className='-mt-[100px] w-[200px] h-[200px] z-10'
          imageClassname='object-cover rounded-full'
          overlayClassName='rounded-full'
          withPreview
        />

        <div className='flex flex-col gap-5 w-full max-w-4xl px-[30px]'>
          <FormInput
            label={t('name')}
            register={register('profileName')}
            error={errors.profileName}
          />
          <div className='grid gap-5 grid-cols-2 max-lg:grid-cols-1'>
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
          <span className='text-grey-light text-sm'>
            {t('bio-description')}
          </span>
          <div className='flex justify-end'>
            <Button
              variant='primary'
              isLoading={updateUserLoading || imageUploading}
              className='min-w-[200px] flex justify-center'
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

UserEdit.auth = true;

export default UserEdit;
