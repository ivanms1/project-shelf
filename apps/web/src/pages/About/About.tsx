import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import Member from '@/pages/About/Member';

export type MemberType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};

interface AboutProps {
  members: MemberType[];
}

const About = ({ members }: AboutProps) => {
  const { t } = useTranslation('about');

  return (
    <div className='bg-black pt-10 pb-20 flex flex-col justify-between gap-16 items-center px-28 max-lg:px-[30px]'>
      <p className='font-semibold text-5xl text-center'>{t('title')}</p>
      <div>
        <div className='flex gap-10 justify-between flex-wrap after:content-[""] after:flex-auto max-lg:justify-center'>
          {members.map((member) => (
            <Member key={member?.id} member={member} />
          ))}
        </div>
      </div>
      <NextSeo title={t('seo-title')} />
    </div>
  );
};

export default About;
