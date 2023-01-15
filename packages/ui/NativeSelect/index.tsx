import * as React from 'react';

import { nativeSelectStyle } from './NativeSelect.css';

interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const NativeSelect = ({ options }: NativeSelectProps) => {
  return (
    <select className={nativeSelectStyle}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
