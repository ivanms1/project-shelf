import { useTranslation } from 'next-i18next';

function PrivacyPolicy() {
  const arr = Array.from(Array(8).keys()).map((_, index) => index + 1);

  const { t } = useTranslation('privacy-policy');
  return (
    <div className=' bg-black  '>
      <div className=' m-auto flex max-w-[1080px] flex-col items-center gap-8 py-10  '>
        <p className=' text-4xl font-semibold'>{t('privacy-policy')}</p>
        <div className='flex flex-col gap-6'>
          {arr.map((paragraph) => (
            <p
              key={paragraph}
              className='px-10 text-left  text-gray-100 lg:px-[100px]'
            >
              {t(`privacy-policy-content-p${paragraph}`)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
