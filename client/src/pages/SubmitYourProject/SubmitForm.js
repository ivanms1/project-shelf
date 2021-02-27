import React, { useState } from 'react';
import ReactToolTip from 'react-tooltip';
import toast from 'react-hot-toast';
import Zoom from 'react-medium-image-zoom';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import PopupModal from '../../components/PopupModal/PopupModal';
import { Dropzone } from '../../components/DropZone/Dropzone';
import SelectTags from './SelectTags/SelectTags';
import Button from '../../components/Button/Button';
import Active from '../../components/Active/Active';
import LoadingText from '../../components/LoadingText/LoadingText';

import useCurrentUser from '../../components/useCurrentUser/useCurrentUser';

import { options } from './SelectOptions/options';
import { getCurrentDate } from './../../helpers/dateConverter';

import { ReactComponent as Spinner } from '../../assets/spinner.svg';

import Rick from '../../assets/rick.png';
import IMG_Social from '../../assets/social.png';

import {
  FormContainer,
  Submission,
  InputContainer,
  Input,
  TextArea,
  ErrorText,
  CustomSubmitCss,
} from './style';
import {
  CardOuter,
  CardInner,
  HeaderCollection,
  Links,
  Profile,
} from '../../components/Card/style';
import { CustomYesButton } from '../../components/PopupModal/style';

const MUTATION_UPLOAD_IMAGE = loader('./mutationUploadImage.graphql');
const CREATE_PROJECT_MUTATION = loader('./mutationCreateProject.graphql');

const EMAIL_STRING = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=';

function SubmitForm() {
  const [imageFiles, setImageFiles] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: {
      title: 'Recipe App',
      preview: IMG_Social,
      description:
        'This was built using MERN stacks. Used cloudaniary for image hosting. Used netlify for hosting in the live server.',
    },
  });

  const { currentUser: user, loading: currentUserLoading } = useCurrentUser();

  const { title, preview, repoLink, siteLink, description } = watch();

  const [uploadImage, { loading: loadingImg }] = useMutation(
    MUTATION_UPLOAD_IMAGE
  );

  const [createProject, { data }] = useMutation(CREATE_PROJECT_MUTATION, {
    update(cache, { data: { createProject } }) {
      cache.modify({
        id: cache.identify(user),
        fields: {
          projects(existingProjects = []) {
            return [createProject, ...existingProjects];
          },
        },
      });
    },
  });

  async function onSubmit(data) {
    await uploadImageToCloudinary(imageFiles.rawFiles, data);
  }

  async function createTheProject(data, imagelink) {
    try {
      await createProject({
        variables: {
          input: {
            authorId: user.id,
            preview: imagelink,
            title: data.title,
            siteLink: data.siteLink,
            repoLink: data.repoLink,
            description: data.description,
            tags: data.tags.map((e) => e.value),
          },
        },
      });
      setSuccessModal(true);
    } catch (error) {
      toast.error("Couldn't create project");
    }
  }

  async function uploadImageToCloudinary(event, data) {
    let reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onabort = () => alert('failed');
    reader.onerror = () => console.log('error');
    reader.onload = async () => {
      const res = await uploadImage({
        variables: {
          path: reader.result,
        },
      });
      await createTheProject(data, res?.data?.image?.url);
    };
  }

  const handleOnDrop = async (event) => {
    if (!event.length) {
      return null;
    }
    const file = event[0];
    const blob = URL.createObjectURL(file);
    setImageFiles({
      preview: blob,
      rawFiles: event,
    });
  };

  if (currentUserLoading) {
    return <Loader />;
  }

  if (loadingImg) {
    return <LoadingText />;
  }

  return (
    <FormContainer>
      <CardOuter>
        <ReactToolTip className='notActivated' id='notActivated'>
          <span>Approved</span>
        </ReactToolTip>

        <div data-tip data-for='notActivated'>
          <div className='activeContainer'>
            <Active active='true' />
          </div>
        </div>

        <CardInner>
          <HeaderCollection>
            <span>{title}</span>
          </HeaderCollection>

          <Links>
            <a href={siteLink}>Live Link</a>
            <a href={repoLink}>Repo Link</a>
            <a href={EMAIL_STRING + user.email}>Contact</a>
          </Links>

          <div className='imgContainer'>
            <Zoom wrapStyle={{ display: 'block' }}>
              {(loadingImg && (
                <p className='loading'>
                  <Spinner />
                </p>
              )) || (
                <img
                  alt={imageFiles?.preview ?? preview}
                  src={imageFiles?.preview ?? preview}
                  width='100%'
                  height='100%'
                />
              )}
            </Zoom>
          </div>
          <Profile>
            <div className='profileContainer'>
              <img alt={Rick} src={Rick} width='100%' height='100%' />
            </div>
            <div className='profileDetails'>
              <p>
                {user.name} {user.lastName}
              </p>
              <p>4th weekly project</p>
            </div>
          </Profile>
          <p className='date'>
            <span className='header'>Published Date :</span> {getCurrentDate()}
          </p>

          <p className='description'>{description}</p>
        </CardInner>
      </CardOuter>

      <Submission onSubmit={handleSubmit(onSubmit)}>
        <span>Submit your Project</span>
        <Controller
          name='preview'
          control={control}
          render={() => (
            <Dropzone
              accept='image/*'
              disabled={loadingImg}
              onDrop={(e) => handleOnDrop(e)}
            />
          )}
        />
        <InputContainer>
          <label>Title of the Project</label>
          <Input
            name='title'
            maxLength='15'
            placeholder='Title of the Project'
            ref={register({
              required: 'Title cannot be empty.',
              maxLength: {
                value: 14,
                message: 'Cannot exceed 14 words',
              },
              minLength: {
                value: 3,
                message: 'Cannot be less than 3 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name='title' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Tags</label>
          <Controller
            name='tags'
            control={control}
            render={({ onChange }) => (
              <SelectTags name='tags' onChange={onChange} options={options} />
            )}
            rules={{ required: 'Tags cannot be Empty' }}
            defaultValue=''
          />
          <ErrorMessage errors={errors} name='tags' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the repository</label>
          <Input
            name='repoLink'
            placeholder='Link to the repository'
            ref={register({
              required: 'Link to the Repo Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />

          <ErrorMessage errors={errors} name='repoLink' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Link to the live site</label>
          <Input
            name='siteLink'
            placeholder='Link to the live site'
            ref={register({
              required: 'Link to the Live Site cannot be empty.',
              pattern: {
                value: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
                message: 'Its not a valid link',
              },
            })}
          />
          <ErrorMessage errors={errors} name='siteLink' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <InputContainer>
          <label>Description</label>
          <TextArea
            name='description'
            placeholder='Description of the project in 50 words.'
            maxLength='150'
            minRows='7'
            maxRows='10'
            ref={register({
              required: 'Description cannot be empty.',
              maxLength: {
                value: 150,
                message: 'Cannot exceed 150 words',
              },
              minLength: {
                value: 50,
                message: 'Cannot be less than 50 words',
              },
            })}
          />

          <ErrorMessage errors={errors} name='description' as={<ErrorText />}>
            {({ message }) => <small>{message}</small>}
          </ErrorMessage>
        </InputContainer>

        <Button addCSS={CustomSubmitCss} type='submit'>
          Submit your Project
        </Button>
      </Submission>
      <PopupModal
        isOpen={successModal}
        onRequestClose={() => setSuccessModal(false)}
        title='Project Submitted'
      >
        <div className='imgContainer'>
          <img src={data?.createProject?.preview} alt='project'></img>
        </div>
        <Link to='/'>
          <Button addCSS={CustomYesButton}>Ok</Button>
        </Link>
      </PopupModal>
    </FormContainer>
  );
}

export default SubmitForm;
