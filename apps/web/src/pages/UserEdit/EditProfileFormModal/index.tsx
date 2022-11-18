import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, FormInput, FormTextArea } from 'ui';

import Dropzone from 'src/components/Dropzone';

import {
  Container,
  Wrapper,
  ProfileImageWrapper,
  ProfileImageButtonWrapper,
  FormDetails,
  SubText,
  SaveProfileWrapper,
} from './style';

function Index({ userDetails }) {
  const { handleSubmit, register, setValue } = useFormContext();
  const [preview, setPreview] = useState(userDetails?.avatar);
  const dropzoneRef = useRef(null);

  const onSubmit = (e) => {
    console.log('what are the fields', e);
  };

  useEffect(() => {
    setPreview(userDetails?.avatar);
    setValue('profileName', userDetails?.name);
  }, [userDetails]);

  return (
    <Container>
      <ProfileImageWrapper>
        <Dropzone
          editProfile
          dropzoneRef={dropzoneRef}
          currentFile={preview}
          onDrop={(files) => setPreview(files[0])}
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
          <Button
            type='button'
            variant='secondary'
            onClick={() => setPreview(userDetails?.avatar)}
          >
            Delete
          </Button>
        </ProfileImageButtonWrapper>
      </ProfileImageWrapper>

      <FormDetails>
        <Wrapper>
          <FormInput label='Name' register={register('profileName')} />

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
          <Button variant='primary' onClick={handleSubmit(onSubmit)}>
            Save Profile
          </Button>
        </SaveProfileWrapper>
      </FormDetails>
    </Container>
  );
}

export default Index;
