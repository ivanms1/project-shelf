import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

export interface DialogProps {
  backdropClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  backdrop?: boolean;
  children: React.ReactNode;
  modalClassName?: string;
  title?: string;
  description?: string;
  open?: boolean;
  className?: string;
  onClose: (value: boolean) => void;
}

export const Modal = ({
  children,
  backdrop = true,
  modalClassName,
  backdropClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  open,
  title,
  description,
  className,
  ...props
}: DialogProps) => {
  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog className={classNames('relative z-50', className)} {...props}>
        {backdrop && (
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              className={classNames(
                'fixed inset-0 bg-black/30',
                backdropClassName
              )}
              aria-hidden='true'
            />
          </Transition.Child>
        )}
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 flex items-center justify-center'>
            <Dialog.Panel
              className={classNames(
                'mx-auto rounded bg-white  p-5',
                modalClassName
              )}
            >
              {title && (
                <Dialog.Title
                  className={classNames('text-4xl', titleClassName)}
                >
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description
                  className={classNames(
                    'text-sm text-neutral-40',
                    descriptionClassName
                  )}
                >
                  {description}
                </Dialog.Description>
              )}
              <div className={contentClassName}>{children}</div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
