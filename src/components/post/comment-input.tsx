import { cn } from "@/lib/utils";
import { MAX_COMMENT_CONTENT_LENGTH } from "@/services/comment";
import React from "react";
import { TextareaAutosize } from "../primitives/textarea-autosize";
import { Button } from "../ui/button";

type CommentInputProps = React.ComponentPropsWithRef<"textarea">;

export const CommentInput = ({ className, ...props }: CommentInputProps) => {
  return (
    <TextareaAutosize
      maxLength={MAX_COMMENT_CONTENT_LENGTH}
      className={cn(
        "flex w-full resize-none rounded-xl bg-background pb-16 pl-4 pr-12 pt-3 text-sm font-medium outline outline-1 outline-border placeholder:text-placeholder",
        className,
      )}
      {...props}
    />
  );
};

type CommentInputContainerProps = React.ComponentPropsWithRef<"div">;

const CommentInputContainer = ({ className, children, ...props }: CommentInputContainerProps) => {
  return (
    <div className={cn("relative flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};

type CommentInputButtonProps = React.ComponentPropsWithRef<"button">;

const CommentInputButton = ({ className, children, ...props }: CommentInputButtonProps) => {
  return (
    <Button variant="outlined" className={cn("absolute bottom-4 right-4", className)} {...props}>
      {children}
    </Button>
  );
};

CommentInput.Container = CommentInputContainer;
CommentInput.Button = CommentInputButton;
