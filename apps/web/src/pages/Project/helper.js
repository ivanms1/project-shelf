export const checkValidationForProjectOptions = (currentUser, projectUser) => {
  const currentLoggedInUserId = currentUser?.id;
  const projectOwnerUserId = projectUser?.project?.author?.id;

  if (currentLoggedInUserId == projectOwnerUserId) {
    return true;
  } else {
    return false;
  }
};
