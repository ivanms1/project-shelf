import React from 'react';

interface CardSkeletonProps {}

const CardSkeleton = ({}: CardSkeletonProps) => {
  return (
    <div role='status' className='animate-pulse'>
      <div className='h-[469px] w-[330px] rounded-lg bg-gray-300'></div>
    </div>
  );
};

export default CardSkeleton;
