import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, gql } from '@apollo/client';
import { loader } from 'graphql.macro';

import useCurrentUser from '../useCurrentUser';
import Spinner from '../Spinner';

import { getCurrentDate } from '../../helpers/dateConverter';

import { ReactComponent as Star } from './../../assets/Star.svg';
import { ReactComponent as StarFill } from './../../assets/Star-Fill.svg';
import { ReactComponent as Bookmark } from './../../assets/bookmark.svg';
import { ReactComponent as BookmarkFill } from './../../assets/bookmark-fill.svg';

import {
  Container,
  CardContainerInner,
  ProjectDetails,
  ViewDetails,
} from './style';

const MUTATION_REACT_TO_PROJECT = loader('./mutationReactToProject.graphql');
const MUTATION_FAVORITE_PROJECT = loader('./mutationFavoriteProject.graphql');

const getActionLikes = (project, currentUser) => {
  return project?.likes?.some((user) => user?.id === currentUser?.id)
    ? 'DISLIKE'
    : 'LIKE';
};

const getActionFavorite = (project, currentUser) => {
  return project?.favorites?.some((user) => user?.id === currentUser?.id)
    ? 'UNDO'
    : 'FAVORITE';
};

function Cardtwo({ project, children }) {
  const [imgLoaded, setImgLoaded] = useState(true);

  const { currentUser } = useCurrentUser();

  const getVariablesLikes = () => {
    return {
      variables: {
        input: {
          projectId: project?.id,
          userId: currentUser?.id,
          action: getActionLikes(project, currentUser),
        },
      },
    };
  };

  const getVariablesFavorite = () => {
    return {
      variables: {
        input: {
          projectId: project?.id,
          userId: currentUser?.id,
          action: getActionFavorite(project, currentUser),
        },
      },
    };
  };

  const [reactToProject] = useMutation(
    MUTATION_REACT_TO_PROJECT,
    getVariablesLikes()
  );

  const [favoriteProject, { loading }] = useMutation(
    MUTATION_FAVORITE_PROJECT,
    {
      ...getVariablesFavorite(),
      update(cache, { data: { favoriteProject } }) {
        cache.modify({
          fields: {
            getMyFavoriteProjects(existing = {}, { readField }) {
              if (getActionFavorite(project, currentUser) === 'FAVORITE') {
                const projectFavorited = cache.writeFragment({
                  data: favoriteProject,
                  fragment: gql`
                    fragment NewProject on Project {
                      id
                      title
                      preview
                      description
                      siteLink
                      repoLink
                      isApproved
                      likes {
                        id
                      }
                      favorites {
                        id
                      }
                      createdAt
                    }
                  `,
                });
                return {
                  ...existing,
                  results: [...existing.results, projectFavorited].sort(
                    (a, b) =>
                      new Date(readField('createdAt', b)) -
                      new Date(readField('createdAt', a))
                  ),
                };
              }

              return {
                ...existing,
                results: existing.results.filter(
                  (p) => readField('id', p) !== favoriteProject.id
                ),
              };
            },
          },
        });
      },
    }
  );

  const favoriteClickHandler = async () => {
    try {
      const action = getActionFavorite(project, currentUser);
      const msg =
        action === 'FAVORITE' ? `Added to favorites` : `Removed from favorites`;
      await favoriteProject();
      toast.success(msg);
    } catch (error) {
      toast.error('Oops, too fast');
    }
  };

  return (
    <Container>
      <button onClick={reactToProject} className='starContainer'>
        {getActionLikes(project, currentUser) === 'LIKE' ? (
          <Star />
        ) : (
          <StarFill />
        )}
      </button>

      <CardContainerInner isApproved={project.isApproved}>
        <div className='imgContainer'>
          {!imgLoaded ? (
            <Spinner type='black' />
          ) : (
            <img
              src={project.preview}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(false)}
              alt={project.title}
            />
          )}

          <div className='overlay'>
            <div className='overlayContent'>
              <button disabled={loading} onClick={favoriteClickHandler}>
                {getActionFavorite(project, currentUser) === 'FAVORITE' ? (
                  <Bookmark />
                ) : (
                  <BookmarkFill />
                )}
              </button>
              <ViewDetails to={`/projectDetails/${project.id}`}>
                View Details
              </ViewDetails>
            </div>
          </div>
        </div>
      </CardContainerInner>
      <ProjectDetails>
        <span className='userName'>{project.title}</span>
        <span className='submissionDate'>
          {getCurrentDate(project.createdAt)}
        </span>
      </ProjectDetails>
      {children}
    </Container>
  );
}

export default Cardtwo;
