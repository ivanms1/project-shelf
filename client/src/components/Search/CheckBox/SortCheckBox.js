import React, { useState } from 'react';

import { StyledCheckbox } from './style';

function SortCheckBox({ checked }) {
  const [check, setCheck] = useState(false);
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        checked={check}
        onChange={() => {
          setCheck(!check);
          checked(!check);
        }}
      />
      <label>Date</label>
    </StyledCheckbox>
  );
}

export default SortCheckBox;
