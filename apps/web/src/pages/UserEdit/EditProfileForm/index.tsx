import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { Button, FormInput, FormTextArea, LoaderOverlay } from 'ui';
import { useRouter } from 'next/router';

import Dropzone from 'src/components/Dropzone';

import toast from 'react-hot-toast';

import {
  Container,
  Wrapper,
  ProfileImageWrapper,
  ProfileImageButtonWrapper,
  FormDetails,
  SubText,
  SaveProfileWrapper,
} from './style';
import { useUpdateUserMutation, useUploadImageMutation } from 'apollo-hooks';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup
  .object()
  .shape({
    profileName: yup.string().required('This is required field'),
  })
  .required();

function Index({ userDetails }) {
  let showOverlay = false;
  const notify = () => toast.success('Profile succesfully updated');

  const dropzoneRef = useRef(null);
  const router = useRouter();
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
    },
    resolver: yupResolver(validationSchema),
  });

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation();
  const [uploadImage, { loading: imageUploading }] = useUploadImageMutation();

  const currentImage = watch('preview');

  const onSubmit = async (e) => {
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
          discord: undefined,
          website: '',
          twitter: '',
          avatar: dirtyFields.preview ? res?.data?.image : undefined,
        },
      },
    });
    return data;
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {showOverlay ? <LoaderOverlay size='lg' /> : null}
      <ProfileImageWrapper>
        <Dropzone
          editProfile='edit'
          dropzoneRef={dropzoneRef}
          currentFile={currentImage}
          onDrop={(files) => {
            setValue('preview', files[0], { shouldDirty: true });
          }}
          label='Drop your thumbnail'
          withPreview
        >
          <div>Drag n&apos; Drop</div>
        </Dropzone>

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

        <Wrapper>
          <FormInput label='Location' register={register('profileLocation')} />
        </Wrapper>

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
  );
}

export default Index;
