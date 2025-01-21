import { useState } from "react";

export const useSwitch = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onChange = () => {
    setValue((prev) => !prev);
  };

  return {
    value,
    onChange,
  };
};
