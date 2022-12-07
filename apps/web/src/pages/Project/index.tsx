import React from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useGetProjectQuery, useDeleteProjectsMutation } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, Badge, LoaderOverlay } from 'ui';

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
  ProjectOptions,
} from './styles';
import LikeButton from './LikeButton/LikeButton';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { checkValidationForProjectOptions } from './helper';

function Project() {
  const router = useRouter();
  const { query } = useRouter();

  const notifySuccess = () => toast.success('Project deleted successfully');
  const notifyFailure = () => toast.error('Project deletetion failed');

  const { currentUser } = useIsLoggedIn();

  const { data, loading: getProjectQueryLoading } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const [deleteProject, { loading: deleteProjectLoading }] =
    useDeleteProjectsMutation();

  const deleteProjectClick = async (projectId) => {
    try {
      const deletedData = await deleteProject({
        variables: {
          projectIds: [projectId],
        },
        update: (cache) => {
          cache.modify({
            fields: {
              getUserProjects(existingProjects, { readField }) {
                return {
                  ...existingProjects,
                  results: existingProjects.results.filter((project) => {
                    return readField('id', project) !== projectId;
                  }),
                };
              },
            },
          });
        },
      });
      if (deletedData?.data?.deleteProjects?.length > 0) {
        router.push(`/user/${currentUser?.id}`);
      }
      notifySuccess();
    } catch (error) {
      notifyFailure();
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (getProjectQueryLoading || deleteProjectLoading) {
    return <LoaderOverlay size='lg' />;
  }

  return (
    <>
      <CloseButton onClick={handleClose} variant='ghost'>
        <StyledCloseIcon />
      </CloseButton>
      <Modal
        modalzIndex='projectModal'
        isOpen
        onClose={handleClose}
        className={modalStyles()}
      >
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
          <LikeButton projectId={data?.project?.id} />
        </Header>
        <ImageContainer>
          <Image
            alt={data?.project?.title}
            src={data?.project?.preview}
            layout='fill'
            priority
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

        {checkValidationForProjectOptions(currentUser, data) && (
          <ProjectOptions>
            <Link href={`/project-edit/${query?.id}`}>
              <a>
                <Button variant='ghost'>Edit</Button>
              </a>
            </Link>

            <Button
              variant='ghost'
              onClick={() => deleteProjectClick(data?.project?.id)}
            >
              Delete
            </Button>
          </ProjectOptions>
        )}
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
              url: data?.project?.preview,
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
