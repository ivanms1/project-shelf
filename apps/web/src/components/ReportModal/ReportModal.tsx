import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Modal, Button, TextArea } from 'ui';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportProjectClick: (error: string, message: string) => void;
}

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

const ReportModal = ({
  isOpen,
  onClose,
  reportProjectClick,
}: ReportModalProps) => {
  const [selected, setSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { t } = useTranslation('project');

  useEffect(() => {
    setSelected(null);
    setMessage('');
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark relative rounded-md w-full max-w-[500px] md:w-auto'
      contentClassName='p-4 max-h-full md:max-h-screen-md overflow-y-auto'
    >
      <div className='flex flex-col gap-2 md:gap-4'>
        <span className='text-2xl font-semibold md:text-3xl'>
          {t('report')}
        </span>
        <p className='text-lg font-medium md:text-xl'>
          {t('reporting-this-post')}
        </p>
        <p className='mb-2 text-sm md:mb-4 md:text-base'>{t('description')}</p>

        <div className='flex flex-row flex-wrap gap-2 md:mb-6 md:gap-4'>
          {TAGS?.map((tag, idx) => (
            <span
              onClick={() => setSelected(tag)}
              className={classNames(
                'cursor-pointer select-none rounded-full py-1 px-3',
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
          <span className='text-lg md:text-xl'>{t('reason')}</span>
          <p>{t('help')}</p>
          <TextArea
            className='block w-full rounded-md border border-gray-300 bg-gray-200 p-2.5 text-sm outline-none dark:text-gray-400 dark:placeholder-gray-400 md:text-base'
            placeholder={t('write-a-message')}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {error && (
          <span className='text-center text-[13px] text-red-400'>
            {t('category')}
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
          {t('submit-report')}
        </Button>
      </div>
    </Modal>
  );
};

export default ReportModal;
