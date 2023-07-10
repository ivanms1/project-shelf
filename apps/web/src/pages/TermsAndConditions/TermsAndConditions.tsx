import { useTranslation } from 'next-i18next';
import { data } from './data';

function TermsAndConditions() {
  const { t } = useTranslation('terms-and-conditions');
  return (
    <div className=' bg-black  '>
      <div className=' m-auto flex max-w-[1080px] flex-col  gap-8 py-10  '>
        <p className=' text-center text-4xl font-semibold'>
          {t('terms-and-conditions')}
        </p>
        <p className='px-10  text-gray-100 lg:px-[100px]'>
          {t('terms-and-conditions-content')}
        </p>

        {data.map((content, i) => (
          <div key={i} className='px-10 lg:px-[100px]'>
            <p className=' text-xl font-semibold'>
              {i + 1}. {t(content.terms_and_conditions_heading)}
            </p>
            <p className=''>{t(content.terms_and_conditions_content)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsAndConditions;
