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
      <div className='flex flex-col  overflow-hidden items-center'>
        <div className='absolute overflow-hidden  w-[300px] h-[250px] rounded-[10px] z-10 top-[-80px]'>
          <Image
            className='rounded-t-lg object-cover  transition ease-in-out duration-300 hover:brightness-75 hover:opacity-100 '
            src={project.preview}
            alt={project.preview}
            layout='fill'
            width={220}
            height={20}
          />
        </div>
        <div className='flex flex-col items-center mt-[120px]'>
          <p className='my-[30px] font-[600] text-[24px] text-center max-w-[350px]'>
            {t('project:share-this')}
          </p>
          <div className='w-full px-[20px] py-[8px] flex flex-row justify-between rounded-[5px] text-left text-lightBlack bg-white '>
            <p className='truncate w-full max-w-[250px] text-black'>
              {router.query.id}
            </p>
            <button
              className='text-red-600 font-medium z-10'
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
