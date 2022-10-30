import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import {
  ProjectActions,
  useGetProjectQuery,
  useReactToProjectMutation,
} from 'apollo-hooks';
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
  StyledLike,
  TagsContainer,
} from './styles';

function Project() {
  const router = useRouter();
  const { query } = useRouter();
  const { previous } = query;
  const [reactToProject] = useReactToProjectMutation();

  const { data } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const handleClose = () => {
    if (typeof previous == 'string') {
      router.push({
        pathname: previous,
      });
    } else {
      router.push('/');
    }
  };

  const handleLike = async () => {
    try {
      await reactToProject({
        variables: {
          input: {
            projectId: data?.project?.id,
            action: data?.project?.isLiked
              ? ProjectActions.Dislike
              : ProjectActions.Like,
          },
        },
        optimisticResponse: {
          reactToProject: {
            ...data?.project,
            id: data?.project?.id,
            likesCount: data?.project?.isLiked
              ? data?.project.likesCount - 1
              : data?.project.likesCount + 1,
            isLiked: !data?.project?.isLiked,
          },
        },
      });
    } catch (error) {
      // TODO: Handle error
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
                    pathname: `/user/${data?.project?.author?.id}`,
                  });
                }}
                height={40}
                width={40}
                src={data?.project?.author?.avatar}
              />
            </Button>

            <InfoText>
              <h1>{data?.project?.title}</h1>
              <Link href={`/user/${data?.project?.author?.id}`}>
                {data?.project?.author?.name}
              </Link>
            </InfoText>
          </InfoBox>
          <Button variant='ghost' onClick={handleLike}>
            <StyledLike isliked={data?.project?.isLiked}>
              {data?.project?.isLiked ? 'Liked' : 'Like'}
            </StyledLike>
          </Button>
        </Header>
        <ImageContainer>
          <Image
            alt={data?.project?.title}
            src={buildImageUrl(data?.project?.preview, {
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
          <Description>{data?.project?.description}</Description>
          <TagsContainer>
            {data?.project?.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </TagsContainer>
          <HStack>
            <Link href={data?.project?.siteLink} passHref>
              <StyledLink target='_blank' rel='noopener noreferrer'>
                <Button variant='ghost'>
                  <StyledExtLinkIcon />
                </Button>
              </StyledLink>
            </Link>
            <Link href={data?.project?.repoLink} passHref>
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
        title={data?.project?.title}
        description={data?.project?.description}
        openGraph={{
          type: 'website',
          title: data?.project?.title,
          description: data?.project?.description,
          site_name: 'Project Shelf',
          images: [
            {
              url: buildImageUrl(data?.project?.preview, {
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
              alt: data?.project?.title,
            },
          ],
        }}
      />
    </>
  );
}

export default Project;
