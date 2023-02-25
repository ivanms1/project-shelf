import React from 'react';
import { useTranslation } from 'next-i18next';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';

import { Modal, Button } from 'ui';

const LoginModal = ({ isOpen, onClose, ...others }) => {
  const { t } = useTranslation('common');
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark'
      contentClassName='p-12 min-w-[600px] flex flex-col gap-3 max-lg:min-w-0 max-lg:w-screen max-lg:px-4'
      {...others}
    >
      <p className='border-2 border-grey-lighter p-2.5 rounded-sm'>
        {t('create-account-or-login')}
      </p>
      <div className='flex gap-2.5 items-center justify-between max-lg:flex-col'>
        <div>
          <h3>{t('discover-projects')}</h3>
          <p>{t('sign-in-to-discover')}</p>
        </div>

        <Image
          src={'/assets/images/shelf.png'}
          alt='project shelf logo'
          width={150}
          height={150}
        />
      </div>
      <Button onClick={() => signIn('github')} className='w-full'>
        {t('login')}
      </Button>
    </Modal>
  );
};

export default LoginModal;
