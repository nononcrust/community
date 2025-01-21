import { useState } from "react";

export const useSelect = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (value: string) => {
    setValue(value);
  };

  return {
    value,
    onChange,
  };
};
