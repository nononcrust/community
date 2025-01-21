"use client";

import { Button } from "@/components/ui/button";
import { useInput } from "@/hooks/use-input";
import TextareaAutosize from "react-textarea-autosize";

export const CommentForm = () => {
  const input = useInput();

  return (
    <div className="mt-8 flex flex-col gap-4">
      <TextareaAutosize
        className="min-h-[120px] rounded-lg border border-border bg-background p-3 outline-none"
        value={input.value}
        onChange={input.onChange}
      />
      <Button className="self-end">작성하기</Button>
    </div>
  );
};
