import { composeRefs } from "@/lib/ref";
import { noop } from "es-toolkit";
import React, { useRef } from "react";

type TextareaAutosizeProps = React.ComponentPropsWithRef<"textarea">;

export const TextareaAutosize = ({ onChange = noop, ref, ...props }: TextareaAutosizeProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event);
    resizeInput();
  };

  const composedRef = composeRefs(textareaRef, ref);

  return <textarea onChange={handleChange} ref={composedRef} {...props} />;
};
