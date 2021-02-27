import React from 'react';

import { ReactComponent as Spinner } from '../../assets/spinner.svg';

import { LoadingContainer, Text } from './style';

const LoadingText = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <Text>Please wait while we submit the project. 🥳</Text>
    </LoadingContainer>
  );
};

export default LoadingText;
