import * as React from 'react';

interface TextAreaProps {
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeholder?: string;
  className?: string;
}

export const TextArea = ({
  placeholder,
  onChange,
  className,
}: TextAreaProps) => {
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
