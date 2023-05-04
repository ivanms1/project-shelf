import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useGetTopProjectsQuery } from 'apollo-hooks';

interface ProjectsTableProps {
  interval?: string;
}

const ProjectsTable = ({ interval }: ProjectsTableProps) => {
  const { t } = useTranslation('top');

  const { data } = useGetTopProjectsQuery({
    variables: {
      interval,
    },
  });

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between font-mono border border-grey-light rounded-lg py-3 px-5 gap-5'>
        <p className='text-grey-light w-1/12'>#</p>
        <p className='text-grey-light flex-1'>{t('title')}</p>
        <p className='text-grey-light w-2/12'>{t('likes')}</p>
        <p className='text-grey-light w-3/12 max-lg:hidden'>{t('tags')}</p>
      </div>
      <div className='flex flex-col gap-5'>
        {data?.getTopProjects?.results?.map((project, index) => (
          <div
            key={project?.id}
            className='flex justify-between w-full bg-grey-dark items-center py-3 px-5 rounded-lg gap-5 max-lg:py-[10px] max-lg:px-3'
          >
            <div className=' w-1/12'>
              <p className='bg-black h-[30px] w-[30px] flex justify-center items-center rounded-full text-grey-light font-mono'>
                {index + 1}
              </p>
            </div>
            <Link
              href={`/project/${project.id}`}
              className='flex items-center gap-5 flex-1'
            >
              <Image
                src={project.preview}
                alt={project?.title}
                width={60}
                height={60}
                className='rounded-full w-[60px] h-[60px] max-lg:w-6 max-lg:h-6'
              />
              <p className='text-[22px] font-semibold max-lg:text-base max-lg:font-normal'>
                {project?.title}
              </p>
            </Link>
            <p className='font-mono w-2/12'>{project?.likesCount}</p>
            <div className='w-3/12 max-lg:hidden flex gap-2 flex-wrap'>
              {project?.tags?.map((tag) => (
                <p
                  key={tag}
                  className='bg-black px-5 py-2 uppercase w-fit rounded-[20px] text-xs'
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTable;
