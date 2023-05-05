import { useState } from 'react';
import { Button, Input } from 'ui';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import {
  useGetTopCreatorsForHomePageQuery,
  useGetTopProjectsForHomePageQuery,
} from 'apollo-hooks';

import TopCreator from './TopCreator';
import ProjectCard from '@/components/ProjectCard';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import useIsMobile from '@/hooks/useIsMobile';

import RegistrationIcon from '@/assets/icons/registration.svg';
import StartupIcon from '@/assets/icons/startup.svg';
import FeedbackIcon from '@/assets/icons/feedback.svg';
import newsletterImage from '@/assets/images/newsletter.jpeg';

function Home() {
  const { t } = useTranslation('home');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { data: projectsData } = useGetTopProjectsForHomePageQuery();
  const { data: creatorsData } = useGetTopCreatorsForHomePageQuery();

  const { isLoggedIn } = useIsLoggedIn();

  const isMobile = useIsMobile();

  const firstProject = projectsData?.getTopProjectsForHomePage?.results?.[0];

  const restProjects =
    projectsData?.getTopProjectsForHomePage?.results.slice(1, 4) ?? [];

  const coverProject = projectsData?.getTopProjectsForHomePage?.results?.[5];

  const handleLogin = async () => {
    setIsAuthLoading(true);
    await signIn('github');
    // Not setting the state to false because of the loading UI flicker on click
  };

  const homeButtonAndActionButtons = (
    <>
      {isLoggedIn ? (
        <Link
          href='/create-project'
          className='max-lg:mb-10 max-lg:w-full'
          passHref
        >
          <Button className='max-lg:w-full'>{t('common:add-project')}</Button>
        </Link>
      ) : (
        <Button
          className='w-fit max-lg:mb-10 max-lg:w-full'
          onClick={handleLogin}
          isLoading={isAuthLoading}
        >
          {t('common:login')}
        </Button>
      )}
      <div className='flex w-1/2 gap-[30px] max-lg:w-auto'>
        <div className='flex flex-col gap-1'>
          <p className='font-mono text-[28px] font-bold'>5k+</p>
          <p className='text-2xl'>{t('common:projects')}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-mono text-[28px] font-bold'>1k+</p>
          <p className='text-2xl'>{t('common:creators')}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-mono text-[28px] font-bold'>15k+</p>
          <p className='text-2xl'>{t('likes')}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className='flex min-h-[100vh] flex-col bg-black px-28 py-20 max-lg:min-h-[70vh] max-lg:px-[30px] max-lg:pt-10'>
      <div className='flex items-start justify-between pb-20 max-lg:flex-col max-lg:pb-0'>
        <div className='flex w-1/2 flex-col gap-5 max-lg:mb-10 max-lg:w-auto'>
          <h1 className='text-[67px] font-semibold leading-tight max-lg:text-[28px]'>
            {t('title')}
          </h1>
          <p className='text-[22px] max-lg:text-base'>{t('description')}</p>
          {!isMobile && homeButtonAndActionButtons}
        </div>
        <Link
          href={`/project/${firstProject?.id}`}
          className='flex flex-col rounded-lg bg-grey-dark max-lg:mb-10'
        >
          <Image
            src={firstProject?.preview ?? ''}
            priority
            className='h-[400px] w-[510] rounded-t-lg object-cover'
            alt='project shelf logo'
            height={400}
            width={510}
          />
          <div className='flex flex-col gap-[10px] py-[22px] px-5'>
            <p>{firstProject?.title}</p>
            <div className='flex gap-3'>
              <Image
                src={firstProject?.author?.avatar}
                alt={firstProject?.author?.name}
                className='h-6 w-6 rounded-full'
                width={24}
                height={24}
              />
              <p>{firstProject?.author.name}</p>
            </div>
          </div>
        </Link>
        {isMobile && homeButtonAndActionButtons}
      </div>
      <div className='py-20'>
        <div className='flex items-center justify-between gap-2.5 pb-20 max-lg:flex-col max-lg:items-start max-lg:pb-10 '>
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
              {t('top-creators')}
            </h2>
            <p className='text-[22px] max-lg:text-base'>
              {t('top-creators-subtitle')}
            </p>
          </div>
          <Link href='/top-creators' passHref>
            <Button className='max-lg:hidden'>{t('view-rankings')}</Button>
          </Link>
        </div>
        <div className='flex flex-wrap justify-center gap-[30px] max-lg:mb-10'>
          {creatorsData?.getTopCreatorsForHomePage?.results.map((creator) => (
            <TopCreator key={creator.id} creator={creator} />
          ))}
        </div>

        <Link href='/top-creators' passHref>
          <Button className='hidden w-full text-center max-lg:block'>
            {t('view-rankings')}
          </Button>
        </Link>
      </div>
      <div className='py-20 max-lg:pt-0'>
        <div className='flex items-center justify-between pb-20  max-lg:flex-col max-lg:items-start max-lg:pb-10'>
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
              {t('discover-more-projects')}
            </h2>
            <p className='text-[22px] max-lg:text-base'>
              {t('discover-more-projects-subtitle')}
            </p>
          </div>
          <Link href='/top-projects' passHref>
            <Button className='max-lg:hidden'>{t('see-all-projects')}</Button>
          </Link>
        </div>
        <div className='flex justify-between gap-8 max-lg:mb-10 max-lg:flex-col'>
          {restProjects.map((project) => (
            <ProjectCard key={project.id} light project={project} noLike />
          ))}
        </div>

        <Link href='/top-projects' passHref>
          <Button className='hidden w-full text-center max-lg:block'>
            {' '}
            {t('see-all-projects')}
          </Button>
        </Link>
      </div>
      <div
        className='-mx-28 flex h-[640px] items-end bg-cover bg-center max-lg:-mx-[30px] max-lg:items-center'
        style={{ backgroundImage: `url(${coverProject?.preview})` }}
      >
        <div className='flex flex-col gap-[30px] py-16 px-28 max-lg:px-[30px]'>
          <div className='flex w-fit items-center gap-3 rounded-lg bg-grey-dark px-5 py-[10px]'>
            <Image
              className='rounded-full'
              src={coverProject?.author?.avatar}
              alt={coverProject?.author?.name}
              width={24}
              height={24}
            />
            <p>{coverProject?.author?.name}</p>
          </div>
          <h3 className='text-[51px] font-semibold max-lg:text-[38px]'>
            {coverProject?.title}
          </h3>
          <Link href={`/project/${coverProject?.id}`} passHref>
            <Button variant='secondary' className='w-fit max-lg:w-full'>
              {t('see-project')}
            </Button>
          </Link>
        </div>
      </div>
      <div className='py-20 max-lg:pt-10'>
        <div className='mb-10 flex flex-col gap-[10px]'>
          <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
            {t('how-it-works')}
          </h2>
          <p className='text-[22px] max-lg:text-base'>{t('find-out')}</p>
        </div>
        <div className='flex justify-between gap-5 max-lg:flex-col'>
          {PROJECT_SHELF_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className='flex h-[440px] w-[330px] flex-col flex-wrap items-center justify-center gap-10 rounded-lg bg-grey-dark p-8'
              >
                <div className='rounded-full bg-step-icon p-10'>
                  <Icon className='h-28 w-28' />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <h3 className='text-center text-[22px] font-semibold'>
                    {t(step.title)}
                  </h3>
                  <p className='text-center'>{t(step.description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='mt-10 mr-auto ml-auto flex max-w-[1050px] items-center justify-between gap-20 rounded-lg bg-grey-dark p-[60px] max-lg:flex-col max-lg:items-stretch max-lg:gap-8 max-lg:bg-transparent max-lg:p-0'>
        <Image
          src={newsletterImage}
          alt='newsletter-image'
          className='h-[310px] w-[425px] rounded-lg object-cover'
          width={425}
          height={310}
        />
        <div className='flex flex-col'>
          <h2 className='mb-2.5 text-4xl font-semibold max-lg:text-[28px]'>
            {t('newsletter-title')}
          </h2>
          <p className='mb-10 text-[22px] max-lg:text-base'>
            {t('newsletter-subtitle')}
          </p>
          <div className='relative flex flex-row'>
            <Input placeholder={t('enter-email')} containerClassName='w-full' />
            <Button className='absolute right-0' size='small' noAnimation>
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </div>
      <NextSeo
        title={t('seo-title')}
        description={t('description')}
        openGraph={{
          type: 'website',
          title: t('title'),
          description: t('description'),
          site_name: 'Project Shelf',
          images: [
            {
              url: 'https://www.projectshelf.dev/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
}

const PROJECT_SHELF_STEPS = [
  {
    title: 'sign-up',
    description: 'sign-up-description',
    icon: RegistrationIcon,
  },
  {
    title: 'create-a-project',
    description: 'create-project-description',
    icon: StartupIcon,
  },
  {
    title: 'share-project',
    description: 'share-project-description',
    icon: FeedbackIcon,
  },
];

export default Home;
