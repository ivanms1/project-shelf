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
  TagsContainer,
} from './styles';

function Project() {
  const router = useRouter();
  const { query } = useRouter();
  const { previous } = query;

  const { data = {} } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { project } = data;

  const handleClose = () => {
    if (typeof previous == 'string') {
      router.push({
        pathname: previous,
      });
    } else {
      router.push('/');
    }
  };
  return (
    <>
      <CloseButton onClick={handleClose} variant='ghost'>
        <StyledCloseIcon />
      </CloseButton>
      <Modal isOpen onClose={handleClose} className={modalStyles()}>
        <Header>
          <InfoBox>
            <Button variant='ghost'>
              <StyledAvatar
                onClick={() => {
                  router.push({
                    pathname: `/user/${project?.author?.id}`,
                  });
                }}
                height={40}
                width={40}
                src={project?.author?.avatar}
              />
            </Button>

            <InfoText>
              <h1>{project?.title}</h1>
              <Link href={`/user/${project?.author?.id}`}>
                {project?.author?.name}
              </Link>
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
          <TagsContainer>
            {project?.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </TagsContainer>
          <HStack>
            <Link href={project?.repoLink} passHref>
              <StyledLink target='_blank' rel='noopener noreferrer'>
                <Button variant='ghost'>
                  <StyledExtLinkIcon />
                </Button>
              </StyledLink>
            </Link>
            <Link href={project?.siteLink} passHref>
              <StyledLink target='_blank' rel='noopener noreferrer'>
                <Button variant='ghost'>
                  <StyledGithubIcon />
                </Button>
              </StyledLink>
            </Link>
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
