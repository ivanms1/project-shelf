import React from 'react';

interface OverlayProps {
  children: JSX.Element;
  color: string;
}

const Overlay = ({ children, color }: OverlayProps) => {
  return (
    <div className='relative'>
      {children}
      <div
        className={`absolute inset-0 bg-${color} opacity-75`}
        style={{ zIndex: 10 }}
      ></div>
    </div>
  );
};

export default Overlay;
