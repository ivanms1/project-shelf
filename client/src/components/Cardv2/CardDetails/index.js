import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/client';
import Zoom from 'react-medium-image-zoom';

import Button from '../../Button';

import Loader from '../../Loader';
import PopupModal from '../../PopupModal';
import Spinner from '../../Spinner';
import useCurrentUser from '../../useCurrentUser';

import { getCurrentDate } from '../../..//helpers/dateConverter';

import { ReactComponent as Github } from '../../../assets/github.svg';
import { ReactComponent as Email } from '../../../assets/email.svg';
import { ReactComponent as Web } from '../../../assets/web.svg';

import {
  Container,
  ImgContainerOuter,
  DetailsContainer,
  UserDetails,
  AllDetails,
  ButtonContainer,
  CustomDeleteButtonCSS,
} from './style';
import 'react-medium-image-zoom/dist/styles.css';

const GET_PROJECT_QUERY = loader('./queryGetProject.graphql');
const DELETE_USER_PROJECT = loader('./mutationDeleteProject.graphql');

function updateQueryCache(existing, readField, deleteId) {
  return {
    ...existing,
    results: existing.results.filter((p) => readField('id', p) !== deleteId),
  };
}

function CardDetails() {
  const [imgLoaded, setImgLoaded] = useState(true);

  const [deleteModelIsOpen, setDeleteModelIsOpen] = useState(false);
  const openDeleteModal = () => setDeleteModelIsOpen(true);
  const closeDeleteModal = () => setDeleteModelIsOpen(false);

  const { projectId } = useParams();
  const history = useHistory();
  const { currentUser } = useCurrentUser();

  const { data, loading, error } = useQuery(GET_PROJECT_QUERY, {
    variables: {
      id: projectId,
    },
  });

  const [deleteProject] = useMutation(DELETE_USER_PROJECT, {
    update(cache, { data: { deleteProject } }) {
      cache.modify({
        fields: {
          getApprovedProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, deleteProject),
          getMyProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, deleteProject),
          getMyFavoriteProjects: (existing = {}, { readField }) =>
            updateQueryCache(existing, readField, deleteProject),
        },
      });
    },
  });

  async function deleteUserProject(projectId) {
    const res = await deleteProject({
      variables: {
        projectId: projectId,
      },
    });
    if (res?.data) {
      closeDeleteModal();
      history.push('/my-projects');
    }
  }

  function editUserProject(projectId) {
    history.push(`/edit/${projectId}`);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Loader />;
  }

  const { project } = data;

  const generateTags = (tags) => {
    return tags.map((tag) => (
      <span key={tag} className='tag'>
        {tag}
      </span>
    ));
  };

  return (
    <>
      <Container>
        {project && (
          <>
            <div className='wrapper'>
              <DetailsContainer>
                <div className='imgUserDetails'>
                  <ImgContainerOuter status={project?.isApproved}>
                    {!imgLoaded ? (
                      <Spinner type='black' />
                    ) : (
                      <Zoom
                        wrapStyle={{ display: 'inline-block' }}
                        zoomZindex='10px'
                      >
                        <img
                          src={project?.preview}
                          alt={project.preview}
                          onLoad={() => setImgLoaded(true)}
                          onError={() => setImgLoaded(false)}
                          width='100%'
                          height='100%'
                        />
                      </Zoom>
                    )}
                  </ImgContainerOuter>

                  <UserDetails>
                    <span className='fullName'>{project?.author.name}</span>
                  </UserDetails>
                </div>

                <AllDetails>
                  <div>
                    <span className='fullName'>{project?.title}</span>
                    <span className='date'>
                      {getCurrentDate(project?.createdAt)}
                    </span>
                    <div className='tagsContainer'>
                      <span className='tagsList'>
                        Tags : {generateTags(project.tags)}
                      </span>
                    </div>
                    <div className='linksContainer'>
                      <span>
                        <Github />{' '}
                        <a
                          href={project.repoLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Github
                        </a>
                      </span>
                      <span>
                        <Email />
                        <a href={'mailto:' + project?.author.email}>Contact</a>
                      </span>
                      <span>
                        <Web />
                        <a
                          href={project.siteLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Live Site
                        </a>
                      </span>
                    </div>

                    <div className='description'>{project?.description}</div>
                  </div>

                  {(currentUser?.email === project?.author.email ||
                    currentUser?.role === 'ADMIN') && (
                    <ButtonContainer>
                      <Button
                        maxWidth='big'
                        fontSize='medium'
                        kind='delete'
                        size='medium'
                        onClick={openDeleteModal}
                        addCSS={CustomDeleteButtonCSS}
                      >
                        Delete
                      </Button>

                      <Button
                        maxWidth='small'
                        fontSize='medium'
                        kind='edit'
                        size='small'
                        onClick={() => editUserProject(project?.id)}
                        addCSS={CustomDeleteButtonCSS}
                      >
                        Edit
                      </Button>
                    </ButtonContainer>
                  )}
                </AllDetails>
              </DetailsContainer>
            </div>
          </>
        )}

        {!project && <p>Project does not exist.</p>}
      </Container>

      <PopupModal
        type='delete'
        isOpen={deleteModelIsOpen}
        onRequestClose={closeDeleteModal}
        onClick={() => {
          deleteUserProject(project?.id);
        }}
      />
    </>
  );
}

export default CardDetails;
