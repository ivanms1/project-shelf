import React from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal } from 'ui';

import {
  CloseButton,
  Description,
  Header,
  ImageContainer,
  imageStyles,
  InfoBox,
  InfoText,
  modalStyles,
  StyledCloseIcon,
} from './styles';

function Project() {
  const { query, push } = useRouter();

  const { data = {} } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { project } = data;

  return (
    <>
      <CloseButton variant='ghost'>
        <StyledCloseIcon />
      </CloseButton>
      <Modal isOpen onClose={() => push('/')} className={modalStyles()}>
        <Header>
          <InfoBox>
            <p>avatar</p>
            <InfoText>
              <h1>{project?.title}</h1>
              <p>{project?.author?.name}</p>
            </InfoText>
          </InfoBox>
          <Button variant='secondary'>Like</Button>
        </Header>
        <ImageContainer>
          <Image
            alt={project?.title}
            src={project?.preview}
            layout='fill'
            className={imageStyles()}
          />
        </ImageContainer>
        <Description>{project.description}</Description>
      </Modal>
      <NextSeo
        title={project?.title}
        description={project?.description}
        openGraph={{
          url: `https://project-shelf-dev.netlify.app/project/${project?.id}`,
          title: project?.title,
          description: project?.description,
          images: [
            {
              url: project?.preview,
              width: 800,
              height: 600,
              alt: project?.title,
              type: 'image/jpeg',
            },
          ],
        }}
      />
    </>
  );
}

export default Project;
