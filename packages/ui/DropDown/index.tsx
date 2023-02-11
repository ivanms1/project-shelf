import * as React from 'react';
import {
  useFloating,
  useInteractions,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  safePolygon,
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

  const hover = useHover(context, {
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

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
