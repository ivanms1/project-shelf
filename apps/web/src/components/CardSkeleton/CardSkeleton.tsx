import React from 'react';

import { cardSkeletonImageStyle, cardSkeletonStyle } from './CardSkeleton.css';

interface CardSkeletonProps {}

const CardSkeleton = ({}: CardSkeletonProps) => {
  return (
    <div className={cardSkeletonStyle}>
      <div className={cardSkeletonImageStyle} />
    </div>
  );
};

export default CardSkeleton;
