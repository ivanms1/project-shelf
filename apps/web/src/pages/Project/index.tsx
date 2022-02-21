import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, Badge } from 'ui';
import { buildImageUrl } from 'cloudinary-build-url';

import {
  CloseButton,
  Description,
  Header,
  ImageContainer,
  imageStyles,
  InfoBox,
  InfoText,
  modalStyles,
  StyledAvatar,
  StyledCloseIcon,
  DescriptionContainer,
  StyledExtLinkIcon,
  StyledGithubIcon,
  HStack,
  StyledLink,
} from './styles';

function Project() {
  const { query } = useRouter();
  const router = useRouter();

  const { data = {} } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { project } = data;

  return (
    <>
      <CloseButton onClick={() => router.back()} variant='ghost'>
        <StyledCloseIcon />
      </CloseButton>
      <Modal isOpen onClose={() => router.back()} className={modalStyles()}>
        <Header>
          <InfoBox>
            <StyledAvatar
              height={40}
              width={40}
              src={project?.author?.avatar}
            />
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
            src={buildImageUrl(project?.preview, {
              transformations: {
                resize: {
                  type: 'scale',
                  height: 558,
                  width: 732,
                },
              },
            })}
            layout='fill'
            className={imageStyles()}
          />
        </ImageContainer>
        <DescriptionContainer>
          <Description>{project?.description}</Description>
          <HStack>
            <Link href={project?.repoLink} passHref>
              <StyledLink target='_blank' rel='noopener noreferrer'>
                <StyledExtLinkIcon />
              </StyledLink>
            </Link>
            <Description>{project?.repoLink}</Description>
          </HStack>
          <HStack>
            <Link href={project?.siteLink} passHref>
              <StyledLink target='_blank' rel='noopener noreferrer'>
                <StyledGithubIcon />
              </StyledLink>
            </Link>
            <Description>{project?.siteLink}</Description>
          </HStack>
          <HStack>
            {project?.tags.map((tag) => (
              <Badge key={project?.id}>{tag}</Badge>
            ))}
          </HStack>
        </DescriptionContainer>
      </Modal>
      <NextSeo
        title={project?.title}
        description={project?.description}
        openGraph={{
          type: 'website',
          title: project?.title,
          description: project?.description,
          site_name: 'Project Shelf',
          images: [
            {
              url: buildImageUrl(project?.preview, {
                transformations: {
                  resize: {
                    type: 'scale',
                    width: 800,
                    height: 600,
                  },
                },
              }),
              width: 800,
              height: 600,
              alt: project?.title,
            },
          ],
        }}
      />
    </>
  );
}

export default Project;
