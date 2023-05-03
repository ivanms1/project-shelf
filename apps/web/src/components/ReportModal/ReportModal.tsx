import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Modal, Button } from 'ui';

type ReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reportProjectClick: (error: string, message: string) => void;
};

function ReportModal({
  isOpen,
  onClose,
  reportProjectClick,
}: ReportModalProps) {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setSelected(false);
    setMessage('');
  }, [isOpen]);

  const TAGS = [
    'Spam',
    'Nudity',
    'Scam',
    'Illegal',
    'Violence',
    'Suicide or self-injury',
    'Hate speech',
    'Something else',
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark relative rounded-md w-full max-w-[500px] md:w-auto'
      contentClassName='p-4 max-h-full md:max-h-screen-md overflow-y-auto'
    >
      <div className='flex flex-col gap-2 md:gap-4'>
        <span className='text-2xl md:text-3xl font-semibold'>Report</span>
        <p className='font-medium text-lg md:text-xl'>
          Why are you reporting this post?
        </p>
        <p className='text-sm md:text-base mb-2 md:mb-4'>
          Your report is anonymous, except if you&apos;re reporting an
          intellectual property infringement. If someone is in immediate danger,
          call the local emergency sevices.
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
              {tag}
            </span>
          ))}
        </div>

        <div className='flex flex-col gap-2 md:gap-4'>
          <span className='text-lg md:text-xl'>Reason</span>
          <p>Help us undestand the problem.</p>
          <textarea
            className='block p-2.5 w-full text-sm md:text-base rounded-md border border-gray-300 bg-gray-200 dark:text-gray-400 dark:placeholder-gray-400 outline-none'
            placeholder='Write a message'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {error && (
          <span className='text-red-400 text-center text-[13px]'>
            Please select a category to report
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
              reportProjectClick(selected, message);
            }
          }}
        >
          Submit Report
        </Button>
      </div>
    </Modal>
  );
}

export default ReportModal;
