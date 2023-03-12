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

  const { data: projectsData } = useGetTopProjectsForHomePageQuery();
  const { data: creatorsData } = useGetTopCreatorsForHomePageQuery();

  const { isLoggedIn } = useIsLoggedIn();

  const isMobile = useIsMobile();

  const firstProject = projectsData?.getTopProjectsForHomePage?.results?.[0];

  const restProjects =
    projectsData?.getTopProjectsForHomePage?.results.slice(1, 4) ?? [];

  const coverProject = projectsData?.getTopProjectsForHomePage?.results?.[5];

  const homeButtonAndActionButtons = (
    <>
      {isLoggedIn ? (
        <Link
          href='/create-project'
          className='max-lg:w-full max-lg:mb-10'
          passHref
        >
          <Button className='max-lg:w-full'>{t('common:add-project')}</Button>
        </Link>
      ) : (
        <Button
          className='max-lg:mb-10 w-fit max-lg:w-full'
          onClick={() => signIn('github')}
        >
          {t('common:login')}
        </Button>
      )}
      <div className='flex gap-[30px] w-1/2 max-lg:w-auto'>
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
    <div className='bg-black flex flex-col px-28 py-20 max-lg:px-[30px] min-h-[100vh] max-lg:min-h-[70vh] max-lg:pt-10'>
      <div className='flex justify-between items-start pb-20 max-lg:flex-col max-lg:pb-0'>
        <div className='flex flex-col gap-5 w-1/2 max-lg:w-auto max-lg:mb-10'>
          <h1 className='text-[67px] font-semibold leading-tight max-lg:text-[28px]'>
            {t('title')}
          </h1>
          <p className='text-[22px] max-lg:text-base'>{t('description')}</p>
          {!isMobile && homeButtonAndActionButtons}
        </div>
        <Link
          href={`/project/${firstProject?.id}`}
          className='rounded-lg bg-grey-dark flex flex-col max-lg:mb-10'
        >
          <Image
            src={firstProject?.preview ?? ''}
            priority
            className='rounded-t-lg object-cover w-[510] h-[400px]'
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
                className='rounded-full w-6 h-6'
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
        <div className='flex justify-between items-center pb-20 gap-2.5 max-lg:flex-col max-lg:items-start max-lg:pb-10 '>
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
              {t('top-creators')}
            </h2>
            <p className='text-[22px] max-lg:text-base'>
              {t('top-creators-subtitle')}
            </p>
          </div>
          <Button className='max-lg:hidden'>
            <Link href='/top-creators' passHref>
              {t('view-rankings')}
            </Link>
          </Button>
        </div>
        <div className='flex gap-[30px] flex-wrap justify-center max-lg:mb-10'>
          {creatorsData?.getTopCreatorsForHomePage?.results.map((creator) => (
            <TopCreator key={creator.id} creator={creator} />
          ))}
        </div>
        <Button
          className='hidden w-full text-center max-lg:block'
          variant='secondary'
        >
          <Link href='/top-creators' passHref>
            {t('view-rankings')}
          </Link>
        </Button>
      </div>
      <div className='py-20 max-lg:pt-0'>
        <div className='flex justify-between items-center pb-20  max-lg:flex-col max-lg:items-start max-lg:pb-10'>
          <div className='flex flex-col gap-[10px]'>
            <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
              {t('discover-more-projects')}
            </h2>
            <p className='text-[22px] max-lg:text-base'>
              {t('discover-more-projects-subtitle')}
            </p>
          </div>
          <Button className='max-lg:hidden'>
            <Link href='/top-creators' passHref>
              {t('see-all-projects')}
            </Link>
          </Button>
        </div>
        <div className='flex gap-8 items-center lg:justify-between max-lg:flex-col max-lg:mb-10'>
          {restProjects.map((project) => (
            <ProjectCard key={project.id} light project={project} noLike />
          ))}
        </div>
        <Button className='hidden w-full text-center max-lg:block'>
          <Link href='/top-creators' passHref>
            {t('see-all-projects')}
          </Link>
        </Button>
      </div>
      <div
        className='h-[640px] flex -mx-28 max-lg:-mx-[30px] bg-cover bg-center items-end max-lg:items-center'
        style={{ backgroundImage: `url(${coverProject?.preview})` }}
      >
        <div className='flex flex-col gap-[30px] py-16 px-28 max-lg:px-[30px]'>
          <div className='flex bg-grey-dark w-fit px-5 py-[10px] gap-3 rounded-lg items-center'>
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
          <Link href={`/project/${coverProject?.id}`}>
            <Button variant='secondary' className='w-fit max-lg:w-full'>
              {t('see-project')}
            </Button>
          </Link>
        </div>
      </div>
      <div className='py-20 max-lg:pt-10'>
        <div className='flex flex-col gap-[10px] mb-10'>
          <h2 className='text-[38px] font-semibold max-lg:text-[28px]'>
            {t('how-it-works')}
          </h2>
          <p className='text-[22px] max-lg:text-base'>{t('find-out')}</p>
        </div>
        <div className='flex justify-between max-lg:flex-col gap-5'>
          {PROJECT_SHELF_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className='flex h-[440px] w-[330px] flex-col gap-10 bg-grey-dark rounded-lg justify-center items-center p-8 flex-wrap'
              >
                <div className='bg-step-icon p-10 rounded-full'>
                  <Icon className='w-28 h-28' />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <h3 className='text-[22px] font-semibold text-center'>
                    {t(step.title)}
                  </h3>
                  <p className='text-center'>{t(step.description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='bg-grey-dark p-[60px] flex justify-between rounded-lg max-w-[1050px] mt-10 mr-auto ml-auto gap-20 items-center max-lg:gap-8 max-lg:items-stretch max-lg:bg-transparent max-lg:flex-col max-lg:p-0'>
        <Image
          src={newsletterImage}
          alt='newsletter-image'
          className='rounded-lg object-cover w-[425px] h-[310px]'
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
          <div className='flex flex-row relative'>
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
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
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
