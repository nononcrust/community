import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const focusInputToCurosrEnd = (input: HTMLInputElement | HTMLTextAreaElement) => {
  input.setSelectionRange(input.value.length, input.value.length);
  input.focus();
};
