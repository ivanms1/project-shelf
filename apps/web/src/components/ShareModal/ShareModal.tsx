import React from 'react';
import { Modal } from 'ui';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

type ShareModalProps = {
  project: {
    preview: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal = ({ project, isOpen, onClose }: ShareModalProps) => {
  const router = useRouter();

  const { t } = useTranslation('project');

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark relative rounded-[3%]'
      contentClassName='p-[40px] rounded-[10px] min-w-[400px] max-lg:min-w-0 max-lg:w-screen max-lg:px-4'
    >
      <div className='flex flex-col  items-center overflow-hidden'>
        <div className='absolute top-[-80px]  z-10 h-[250px] w-[300px] overflow-hidden rounded-[10px]'>
          <Image
            className='rounded-t-lg object-cover  transition duration-300 ease-in-out hover:opacity-100 hover:brightness-75 '
            src={project.preview}
            alt={project.preview}
            layout='fill'
            width={220}
            height={20}
          />
        </div>
        <div className='mt-[120px] flex flex-col items-center'>
          <p className='my-[30px] max-w-[350px] text-center text-[24px] font-[600]'>
            {t('project:share-this')}
          </p>
          <div className='text-lightBlack flex w-full flex-row justify-between rounded-[5px] bg-white px-[20px] py-[8px] text-left '>
            <p className='w-full max-w-[250px] truncate text-black'>
              {router.query.id}
            </p>
            <button
              className='z-10 font-medium text-red-600'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success(t('project:copied'));
              }}
            >
              {t('project:copy')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
