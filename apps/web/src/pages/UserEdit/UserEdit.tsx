import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as zod from 'zod';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormInput,
  FormTextArea,
  Modal,
  LoaderOverlay,
  Loader,
} from 'ui';
import {
  UploadImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import fileReader from '@/helpers/fileReader';

import type { FetchResult } from '@apollo/client';
import Cropper from '@/components/Cropper';
import Image from 'next/image';

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
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showCoverPic, setShowCoverPic] = useState(false);
  const [image, setImage] = useState();
  const [imageCover, setImageCover] = useState();
  const [showCoverLoader, setShowCoverLoader] = useState(true);
  const [showProfilePicLoader, setShowProfilePicLoader] = useState(true);

  const [croppedImage, setCroppedImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
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

  const onAvatarSubmit = async () => {
    try {
      const res = await uploadImage({
        variables: {
          path: String(croppedImage),
        },
      });
      const updateUserResponse = await updateUser({
        variables: {
          input: {
            avatar: res.data?.image,
          },
        },
      });
      if (updateUserResponse) {
        setShowProfilePic(false);
      }

      toast.success(t('success-profile-pic'));
      router.push(`/user/${userId}`);
    } catch (error) {
      toast.error(t('error-profile-pic'));
    }
  };

  const onCoverSubmit = async () => {
    try {
      const res = await uploadImage({
        variables: {
          path: String(coverImage),
        },
      });
      const updateUserResponse = await updateUser({
        variables: {
          input: {
            cover: res.data?.image,
          },
        },
      });
      if (updateUserResponse) {
        setShowCoverPic(false);
      }

      toast.success(t('success-profile-pic'));
      router.push(`/user/${userId}`);
    } catch (error) {
      toast.error(t('error-profile-pic'));
    }
  };

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
      {imageUploading && <LoaderOverlay transparent size='lg' />}
      <form
        className='mb-10 flex w-full flex-col items-center '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className='h-72 w-full '
          onClick={() => {
            setShowCoverPic(true);
          }}
        >
          <div className='group relative flex h-72 w-full cursor-pointer '>
            {showCoverLoader && (
              <div className='flex w-full items-center justify-center'>
                <Loader size='lg' />
              </div>
            )}
            <Image
              className='h-full w-full object-cover'
              src={String(currentCover) || COVER_PLACEHOLDER}
              alt={String(currentCover)}
              onLoad={() => setShowCoverLoader(false)}
              onError={() => setShowCoverLoader(false)}
              layout='fill'
              objectPosition='top'
              objectFit='cover'
            />

            <div className='absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center  bg-overlay text-xl opacity-0 transition-opacity group-hover:opacity-100 '>
              <span className='text-l text-white '>Change Cover</span>
            </div>
          </div>
        </div>
        <div
          className='-mt-[100px] '
          onClick={() => {
            setShowProfilePic(true);
          }}
        >
          <div className='group relative'>
            {showProfilePicLoader && (
              <div className='absolute top-0 left-0 flex h-60 w-60 items-center justify-center rounded-circle border-2'>
                <Loader size='lg' />
              </div>
            )}
            <Image
              className='h-full w-full cursor-pointer rounded-circle object-cover'
              src={croppedImage || String(currentImage)}
              alt={String(currentImage)}
              width={200}
              height={200}
              onLoad={() => setShowProfilePicLoader(false)}
              onError={() => setShowProfilePicLoader(false)}
            />
            {!showProfilePicLoader && (
              <div className='absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center rounded-circle bg-[rgba(0,0,0,0.6)] text-xl opacity-0 transition-opacity group-hover:opacity-100'>
                <span className='text-l text-white'>Change Image</span>
              </div>
            )}
          </div>
        </div>

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

      <Modal
        open={showProfilePic}
        onClose={() => setShowProfilePic(false)}
        modalClassName='bg-grey-dark flex flex-col justify-center p-12 w-[40vw] overflow-hidden'
      >
        <div className='flex flex-col items-center'>
          <p className=' w-full text-[30px]'>Change Profile Pic</p>

          <div className='my-5  h-full w-full overflow-hidden'>
            <Cropper
              src={currentImage}
              setCroppedImage={setCroppedImage}
              image={image || ''}
              setImage={setImage}
              onSubmit={onAvatarSubmit}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={showCoverPic}
        onClose={() => setShowCoverPic(false)}
        modalClassName='bg-grey-dark flex flex-col justify-center p-12 w-[40vw] overflow-hidden'
      >
        <div className='flex flex-col items-center'>
          <p className=' w-full text-[30px]'>Cover Image</p>

          <div className='my-5  h-full w-full overflow-hidden'>
            <Cropper
              src={currentCover}
              setCroppedImage={setCoverImage}
              image={imageCover || ''}
              setImage={setImageCover}
              onSubmit={onCoverSubmit}
            />
          </div>
        </div>
      </Modal>

      <NextSeo title={t('seo-title')}></NextSeo>
    </div>
  );
};

UserEdit.auth = true;

export default UserEdit;
