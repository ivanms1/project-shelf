import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { Button, FormInput, FormTextArea, LoaderOverlay } from 'ui';
import AvatarDropzone from 'src/components/AvatarDropzone';

import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';

import {
  MainWrapper,
  Container,
  Wrapper,
  ProfileImageWrapper,
  ProfileImageButtonWrapper,
  FormDetails,
  SubText,
  SaveProfileWrapper,
  FlexRowWrapper,
} from './style';
import { NextSeo } from 'next-seo';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup
  .object()
  .shape({
    profileName: yup.string().required('This is required field'),
    profileWebsite: yup.string().url('It must be a valid URL'),
  })
  .required();

const UserEdit = () => {
  let showOverlay = false;
  const notify = () => toast.success('Profile succesfully updated');

  const dropzoneRef = useRef<any>(null);
  const router = useRouter();
  const { data } = useGetCurrentUserQuery();
  const userDetails = data?.getCurrentUser;

  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
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

  const onSubmit = async () => {
    let res, data;

    try {
      if (JSON.stringify(dirtyFields) == '{}') {
        return;
      }

      if (dirtyFields.preview) {
        const reader = new FileReader();
        reader.readAsDataURL(getValues('preview'));
        reader.onload = async () => {
          res = await uploadImage({
            variables: {
              path: String(reader.result),
            },
          });
          if (res) {
            data = await updateUserVariables(res);
            await router.push(`/user/${data?.data?.updateUser?.id}`);
            await notify();
          }
        };
      } else {
        data = await updateUserVariables(undefined);
        await router.push(`/user/${data?.data?.updateUser?.id}`);
        await notify();
      }
    } catch (error) {}
  };

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
  }, [userDetails, reset]);

  if (updateUserLoading || imageUploading) {
    showOverlay = true;
  }

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

  return (
    <MainWrapper>
      <Container onSubmit={handleSubmit(onSubmit)}>
        {showOverlay ? <LoaderOverlay size='lg' /> : null}
        <ProfileImageWrapper>
          <AvatarDropzone
            dropzoneRef={dropzoneRef}
            currentFile={currentImage}
            onDrop={(files) => {
              setValue('preview', files[0], { shouldDirty: true });
            }}
            label='Drop your thumbnail'
            withPreview
          >
            <div>Drag n&apos; Drop</div>
          </AvatarDropzone>

          <ProfileImageButtonWrapper>
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
                  setValue('preview', userDetails.avatar);
                }}
              >
                Delete
              </Button>
            )}
          </ProfileImageButtonWrapper>
        </ProfileImageWrapper>

        <FormDetails>
          <Wrapper>
            <FormInput
              label='Name'
              register={register('profileName')}
              error={errors.profileName}
            />

            <SubText>
              We’re big on real names around here, so people know who’s who.
            </SubText>
          </Wrapper>

          <FlexRowWrapper>
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
          </FlexRowWrapper>
          <Wrapper>
            <FormTextArea
              label='Bio'
              type='text'
              register={register('profileBio')}
            />
            <SubText>
              Brief description for your profile. URLs are hyperlinked.
            </SubText>
          </Wrapper>

          <SaveProfileWrapper>
            <Button variant='primary' type='submit'>
              Save Profile
            </Button>
          </SaveProfileWrapper>
        </FormDetails>
      </Container>

      <NextSeo title='Edit Profile | Project-shelf'></NextSeo>
    </MainWrapper>
  );
};

export default UserEdit;
