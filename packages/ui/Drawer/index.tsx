import * as React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

import CloseIcon from '../assets/close-icon.svg';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  closable?: boolean;
}

export const Drawer = ({
  open,
  onClose,
  title,
  children,
  className,
  closable,
}: DrawerProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-loading-overlay' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                  {closable && (
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute top-0 right-0 mr-2 flex mt-2'>
                        <button
                          type='button'
                          className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                          onClick={onClose}
                          autoFocus={false}
                        >
                          <span className='sr-only'>Close panel</span>
                          <CloseIcon
                            className='h-6 w-6 fill-white'
                            aria-hidden='true'
                          />
                        </button>
                      </div>
                    </Transition.Child>
                  )}

                  <div
                    className={classNames(
                      'flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl',
                      className
                    )}
                  >
                    {title && (
                      <div className='px-4 sm:px-6'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          {title}
                        </Dialog.Title>
                      </div>
                    )}
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
