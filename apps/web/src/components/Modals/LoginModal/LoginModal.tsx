import React from 'react';
import { useTranslation } from 'next-i18next';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';

import { Modal, Button } from 'ui';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose, ...props }: LoginModalProps) => {
  const { t } = useTranslation('common');
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark rounded-md'
      contentClassName='p-5 min-w-[600px] flex flex-col gap-4 max-lg:min-w-0 max-lg:w-screen max-lg:px-4 max-lg:max-w-[80vw]'
      {...props}
    >
      <div className='flex justify-center'>
        <Image
          src={'/assets/images/shelf.png'}
          alt='project shelf logo'
          width={150}
          height={150}
        />
      </div>

      <div className='mb-7 flex flex-col gap-3 justify-center items-center max-lg:flex-col max-lg:text-center'>
        <p className='text-3xl lg:text-4xl font-semibold'>
          {t('discover-projects')}
        </p>
        <p className='text-lg lg:text-xl'>{t('sign-in-to-discover')}</p>
      </div>
      <p className='text-base lg:text-base text-center'>
        {t('create-account-or-login')}
      </p>
      <Button onClick={() => signIn('github')} className='w-full'>
        {t('login')}
      </Button>
    </Modal>
  );
};

export default LoginModal;
