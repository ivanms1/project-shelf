import React, { useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { NextSeo } from 'next-seo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormInput, FormTextArea, LoaderOverlay } from 'ui';
import AvatarDropzone from 'src/components/AvatarDropzone';

import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

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

  const notifySuccess = () => toast.success('Profile succesfully updated');
  const notifyError = () => toast.error('Something went wrong');

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
            label='Drop your thumbnail'
            imageClassname={profileImageStyle}
            withPreview
          >
            <div>Drag n&apos; Drop</div>
          </AvatarDropzone>

          <div className={profileImageButtonWrapperStyle}>
            <Button
              type='button'
              variant='primary'
              onClick={() => {
                dropzoneRef?.current?.click();
              }}
            >
              Upload new picture
            </Button>

            {typeof currentImage == 'object' && (
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setValue('preview', userDetails?.avatar);
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </div>

        <div className={formDetailsStyle}>
          <div className={inputContainer}>
            <FormInput
              label='Name'
              register={register('profileName')}
              error={errors.profileName}
            />

            <span className={subTextStyle}>
              We&apos;re big on real names around here, so people know
              who&apos;s who.
            </span>
          </div>

          <div className={inputsContainer}>
            <FormInput
              label='Location'
              register={register('profileLocation')}
            />
            <FormInput
              label='Website'
              register={register('profileWebsite')}
              error={errors.profileWebsite}
            />
            <FormInput
              label='Twitter'
              register={register('profileTwitter')}
              placeholder='@revengeZi'
            />
            <FormInput
              label='Discord'
              register={register('profileDiscord')}
              placeholder='uzamaki21#0951'
            />
          </div>
          <div className={inputContainer}>
            <FormTextArea
              label='Bio'
              type='text'
              register={register('profileBio')}
            />
            <span className={subTextStyle}>
              Brief description for your profile.
            </span>
          </div>

          <div className={saveProfileWrapper}>
            <Button variant='primary' type='submit'>
              Save Profile
            </Button>
          </div>
        </div>
      </form>
      <NextSeo title='Edit Profile | Project-shelf'></NextSeo>
    </div>
  );
};

export default UserEdit;
