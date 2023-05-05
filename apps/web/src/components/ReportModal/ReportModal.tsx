import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Modal, Button, TextArea } from 'ui';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportProjectClick: (error: string, message: string) => void;
}

const ReportModal = ({
  isOpen,
  onClose,
  reportProjectClick,
}: ReportModalProps) => {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { t } = useTranslation('project');

  useEffect(() => {
    setSelected(false);
    setMessage('');
  }, [isOpen]);

  const TAGS = [
    {
      name: 'spam',
      value: 'Spam',
    },
    {
      name: 'nudity',
      value: 'Nudity',
    },
    {
      name: 'scam',
      value: 'Scam',
    },
    {
      name: 'illegal',
      value: 'Illegal',
    },
    {
      name: 'violence',
      value: 'Violence',
    },
    {
      name: 'suicide-or-self-injury',
      value: 'Suicide or self injury',
    },
    {
      name: 'hate-speech',
      value: 'Hate speech',
    },
    {
      name: 'something-else',
      value: 'Something else',
    },
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark relative rounded-md w-full max-w-[500px] md:w-auto'
      contentClassName='p-4 max-h-full md:max-h-screen-md overflow-y-auto'
    >
      <div className='flex flex-col gap-2 md:gap-4'>
        <span className='text-2xl md:text-3xl font-semibold'>
          {t('project:report')}
        </span>
        <p className='font-medium text-lg md:text-xl'>
          {t('project:reporting-this-post')}
        </p>
        <p className='text-sm md:text-base mb-2 md:mb-4'>
          {t('project:description')}
        </p>

        <div className='flex flex-row flex-wrap gap-2 md:gap-4 md:mb-6'>
          {TAGS?.map((tag, idx) => (
            <span
              onClick={() => setSelected(tag)}
              className={classNames(
                'rounded-full py-1 px-3 cursor-pointer select-none',
                {
                  'bg-red-200 text-red-600': selected == tag,
                  'bg-white text-gray-600': selected !== tag,
                }
              )}
              key={idx}
            >
              {t(tag.name)}
            </span>
          ))}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          <span className='text-lg md:text-xl'>{t('project:reason')}</span>
          <p>{t('project:help')}</p>
          <TextArea
            className='block p-2.5 w-full text-sm md:text-base rounded-md border border-gray-300 bg-gray-200 dark:text-gray-400 dark:placeholder-gray-400 outline-none'
            placeholder={t('write-a-message')}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {error && (
          <span className='text-red-400 text-center text-[13px]'>
            {t('project:category')}
          </span>
        )}
        <Button
          variant='primary'
          className='text-sm md:text-base'
          onClick={() => {
            if (!selected) {
              setError(true);
            } else {
              setError(false);
              reportProjectClick(selected.value, message);
            }
          }}
        >
          {t('project:submit-report')}
        </Button>
      </div>
    </Modal>
  );
};

export default ReportModal;
