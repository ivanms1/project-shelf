import React, { useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormInput, FormTextArea, LoaderOverlay } from 'ui';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import AvatarDropzone from 'src/components/AvatarDropzone';

import {
  formDetailsStyle,
  formStyle,
  inputContainer,
  inputsContainer,
  mainWrapperStyle,
  profileImageButtonWrapperStyle,
  profileImageStyle,
  profileImageWrapperStyle,
  saveProfileWrapper,
  subTextStyle,
} from './UserEdit.css';

type FormTypes = {
  preview: File | string;
  profileName: string;
  profileLocation: string;
  profileDiscord: string;
  profileWebsite: string;
  profileBio: string;
  profileTwitter: string;
};

const validationSchema = yup
  .object()
  .shape({
    profileName: yup.string().required('This is required field'),
    profileWebsite: yup.string().url('It must be a valid URL'),
  })
  .required();

const UserEdit = () => {
  const { data } = useGetCurrentUserQuery();

  const { t } = useTranslation('user-edit');

  const userDetails = data?.getCurrentUser;
  const userId = userDetails?.id;

  const dropzoneRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<FormTypes>({
    defaultValues: {
      preview: userDetails?.avatar,
      profileName: userDetails?.name,
      profileBio: userDetails?.bio,
      profileLocation: userDetails?.location,
      profileWebsite: userDetails?.website,
      profileTwitter: userDetails?.twitter,
      profileDiscord: userDetails?.discord,
    },
    resolver: yupResolver(validationSchema),
  });

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [uploadImage, { loading: imageUploading }] = useUploadImageMutation();

  useEffect(() => {
    reset({
      preview: userDetails?.avatar,
      profileName: userDetails?.name,
      profileBio: userDetails?.bio,
      profileLocation: userDetails?.location,
      profileWebsite: userDetails?.website,
      profileTwitter: userDetails?.twitter,
      profileDiscord: userDetails?.discord,
    });

    return () => {
      dropzoneRef.current = null;
    };
  }, [userDetails, reset]);

  const notifySuccess = () => toast.success(t('edit-success'));
  const notifyError = () => toast.error(t('edit-failure'));

  const onSubmit: SubmitHandler<FormTypes> = async () => {
    if (!isDirty) {
      router.push(`/user/${userId}`);
      return;
    }
    try {
      if (dirtyFields.preview) {
        const reader = new FileReader();
        reader.readAsDataURL(getValues('preview') as File);
        reader.onload = async () => {
          const res = await uploadImage({
            variables: {
              path: String(reader.result),
            },
          });
          if (res) {
            await updateUserVariables(res);
          }
        };
      } else {
        await updateUserVariables(undefined);
      }
      router.push(`/user/${userId}`);
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };

  const updateUserVariables = async (res) => {
    const data = await updateUser({
      variables: {
        input: {
          name: getValues('profileName'),
          bio: getValues('profileBio'),
          discord: getValues('profileDiscord'),
          website: getValues('profileWebsite'),
          twitter: getValues('profileTwitter'),
          location: getValues('profileLocation'),
          avatar: dirtyFields.preview ? res?.data?.image : undefined,
        },
      },
    });
    return data;
  };

  const currentImage = watch('preview');

  if (updateUserLoading || imageUploading) {
    return <LoaderOverlay size='lg' />;
  }

  return (
    <div className={mainWrapperStyle}>
      <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <div className={profileImageWrapperStyle}>
          <AvatarDropzone
            dropzoneRef={dropzoneRef}
            currentFile={currentImage}
            onDrop={(files) => {
              setValue('preview', files[0], { shouldDirty: true });
            }}
            label={t('thumbnail-label')}
            imageClassname={profileImageStyle}
            withPreview
          >
            <div>{t('drag-drop-label')}</div>
          </AvatarDropzone>

          <div className={profileImageButtonWrapperStyle}>
            <Button
              type='button'
              variant='primary'
              onClick={() => {
                dropzoneRef?.current?.click();
              }}
            >
              {t('upload-new-picture')}
            </Button>

            {typeof currentImage == 'object' && (
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setValue('preview', userDetails?.avatar);
                }}
              >
                {t('common:delete')}
              </Button>
            )}
          </div>
        </div>

        <div className={formDetailsStyle}>
          <div className={inputContainer}>
            <FormInput
              label={t('name')}
              register={register('profileName')}
              error={errors.profileName}
            />

            <span className={subTextStyle}></span>
          </div>

          <div className={inputsContainer}>
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
          <div className={inputContainer}>
            <FormTextArea
              label={t('bio')}
              type='text'
              register={register('profileBio')}
            />
            <span className={subTextStyle}>{t('bio-description')}</span>
          </div>

          <div className={saveProfileWrapper}>
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
