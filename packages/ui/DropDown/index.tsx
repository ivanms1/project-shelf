import * as React from 'react';

import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  FloatingFocusManager,
  FloatingPortal,
  useRole,
  offset,
  flip,
  useHover,
  autoUpdate,
  shift,
  safePolygon,
} from '@floating-ui/react';

interface IDropDown {
  parent: JSX.Element;
  children: JSX.Element;
  open: boolean;
  setOpen: (e: boolean) => void;
}

export const DropDown = ({ open, setOpen, parent, children }: IDropDown) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset({ mainAxis: 30, crossAxis: -40 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Handles opening the floating element via the Choose Emoji button.
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useHover(context, {
      enabled: true,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    }),
    useDismiss(context),
    useRole(context),
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {parent}
      </div>

      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps({
                onClick: () => setOpen(false),
              })}
            >
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
