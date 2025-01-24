"use client";

import { CommentInput } from "@/components/post/comment-input";
import { useInput } from "@/hooks/use-input";
import { useCreateComment } from "@/services/comment";
import { Post } from "@/services/post";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: Post["id"];
};

export const CommentForm = ({ postId }: CommentFormProps) => {
  const input = useInput();
  const router = useRouter();

  const { mutate: createComment, isPending } = useCreateComment();

  const onSubmit = () => {
    if (isPending) return;

    createComment(
      {
        content: input.value,
        postId: postId,
      },
      {
        onSuccess: () => {
          input.clear();
          router.refresh();
        },
      },
    );
  };

  return (
    <CommentInput.Container className="mt-8">
      <CommentInput
        placeholder="댓글을 입력하세요."
        value={input.value}
        onChange={input.onChange}
      />
      <CommentInput.Button onClick={onSubmit} disabled={input.value.length === 0}>
        작성하기
      </CommentInput.Button>
    </CommentInput.Container>
  );
};
