import React from 'react';
import { Modal } from 'ui';
import { useRouter } from 'next/router';
import Image from 'next/image';

function ShareModal({ project, isOpen, onClose }) {
  console.log({ project });
  const router = useRouter();
  console.log(router);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      modalClassName='bg-grey-dark relative'
      contentClassName='p-12 min-w-[600px] max-lg:min-w-0 max-lg:w-screen max-lg:px-4'
    >
      <div className='flex flex-col  border-2 border-red-200 overflow-hidden'>
        <div>
          this is share model
          <Image
            className='rounded-t-lg object-cover  transition ease-in-out duration-300 hover:brightness-75 hover:opacity-100 '
            src={project.preview}
            alt={project.preview}
            layout='fill'
            width={220}
            height={20}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;
