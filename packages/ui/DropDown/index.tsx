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

interface DropDown {
  parent: JSX.Element;
  children: JSX.Element;
  open: boolean;
  setOpen: any;
}

export const DropDown = ({ open, setOpen, parent, children }: DropDown) => {
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
              top: y + 20 ?? 0,
              left: x ?? 0,
            },
          })}
        >
          {children}
        </div>
      )}
    </>
  );
};
export default DropDown;
