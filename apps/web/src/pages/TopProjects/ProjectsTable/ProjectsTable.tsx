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
      <div className='flex justify-between gap-5 rounded-lg border border-grey-light py-3 px-5 font-mono'>
        <p className='w-1/12 text-grey-light'>#</p>
        <p className='flex-1 text-grey-light'>{t('title')}</p>
        <p className='w-2/12 text-grey-light'>{t('likes')}</p>
        <p className='w-3/12 text-grey-light max-lg:hidden'>{t('tags')}</p>
      </div>
      <div className='flex flex-col gap-5'>
        {data?.getTopProjects?.results?.map((project, index) => (
          <div
            key={project?.id}
            className='flex w-full items-center justify-between gap-5 rounded-lg bg-grey-dark py-3 px-5 max-lg:py-[10px] max-lg:px-3'
          >
            <div className=' w-1/12'>
              <p className='flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black font-mono text-grey-light'>
                {index + 1}
              </p>
            </div>
            <Link
              href={`/project/${project.id}`}
              className='flex flex-1 items-center gap-5'
            >
              <Image
                src={project.preview}
                alt={project?.title}
                width={60}
                height={60}
                className='h-[60px] w-[60px] rounded-full max-lg:h-6 max-lg:w-6'
              />
              <p className='text-[22px] font-semibold max-lg:text-base max-lg:font-normal'>
                {project?.title}
              </p>
            </Link>
            <p className='w-2/12 font-mono'>{project?.likesCount}</p>
            <div className='flex w-3/12 flex-wrap gap-2 max-lg:hidden'>
              {project?.tags?.map((tag) => (
                <p
                  key={tag}
                  className='w-fit rounded-[20px] bg-black px-5 py-2 text-xs uppercase'
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
