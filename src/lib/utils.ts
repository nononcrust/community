import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const focusInputToCursorEnd = (input: HTMLInputElement | HTMLTextAreaElement) => {
  input.setSelectionRange(input.value.length, input.value.length);
  input.focus();
};
