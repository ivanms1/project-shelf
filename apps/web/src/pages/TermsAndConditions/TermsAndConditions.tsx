import React from 'react';
import { useTranslation } from 'next-i18next';
import { TERMS_AND_CONDITIONS } from 'const';
import { NextSeo } from 'next-seo';

function TermsAndConditions() {
  const { t } = useTranslation('terms-and-conditions');

  return (
    <div className='bg-black'>
      <div className='m-auto flex max-w-[1080px] flex-col gap-8 py-32'>
        <p className='text-center text-4xl font-semibold'>
          {t('terms-and-conditions')}
        </p>
        <p className='px-10 text-gray-100 lg:px-[100px]'>
          {t('terms-and-conditions-content')}
        </p>

        {TERMS_AND_CONDITIONS.map((content, i) => (
          <div key={i} className='px-10 lg:px-[100px]'>
            <p className='text-xl font-semibold'>
              {i + 1}. {t(content.terms_and_conditions_heading)}
            </p>
            <p>{t(content.terms_and_conditions_content)}</p>
          </div>
        ))}
      </div>
      <NextSeo title={t('terms-and-conditions')} />
    </div>
  );
}

export default TermsAndConditions;
