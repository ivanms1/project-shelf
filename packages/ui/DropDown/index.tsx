import React from 'react';
import {
  useFloating,
  useClick,
  useInteractions,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
} from '@floating-ui/react-dom-interactions';

interface IDropDown {
  parent: JSX.Element;
  children: JSX.Element;
  open: boolean;
  setOpen: (e: boolean) => void;
}

const Z_INDEX = 999;

export const DropDown = ({ open, setOpen, parent, children }: IDropDown) => {
  const { x, y, reference, floating, strategy, context } =
    useFloating<HTMLButtonElement>({
      open: open,
      onOpenChange: setOpen,
      middleware: [offset(5), flip(), shift()],
      whileElementsMounted: autoUpdate,
      strategy: 'fixed',
    });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  return (
    <>
      <div
        {...getReferenceProps({
          ref: reference,
        })}
      >
        {parent}
      </div>

      {open && (
        <div
          {...getFloatingProps({
            onClick() {
              setOpen(false);
            },
            ref: floating,

            style: {
              position: strategy,
              top: y ? y + 20 : 0,
              left: x ?? 0,
              zIndex: Z_INDEX,
            },
          })}
        >
          {children}
        </div>
      )}
    </>
  );
};
