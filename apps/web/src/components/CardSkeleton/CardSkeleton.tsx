import React from 'react';

interface CardSkeletonProps {}

const CardSkeleton = ({}: CardSkeletonProps) => {
  return (
    <div role='status'>
      <div className='flex h-[469px] w-[330px]  flex-col overflow-hidden rounded-lg'>
        <div className='h-4/6 w-full animate-pulse bg-gray-300'></div>
        <div className='flex flex-1 flex-col bg-black'>
          <div className=' flex flex-col  gap-4 px-6 py-4'>
            <div className='h-5 w-1/3 animate-pulse rounded-sm bg-gray-300'></div>
            <div className='flex flex-row items-center gap-2'>
              <div className='h-10 w-10 animate-pulse rounded-circle bg-gray-300'></div>
              <div className='h-5 w-1/3 animate-pulse rounded-sm bg-gray-300'></div>
            </div>
          </div>

          <div className='flex  h-full w-full flex-1 items-center justify-end pr-2 '>
            <span className='h-5 w-1/4 animate-pulse rounded-sm bg-gray-300'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
