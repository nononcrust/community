"use client";

import { CommentInput } from "@/components/post/comment-input";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { useSession } from "@/features/auth/use-session";
import { useInput } from "@/hooks/use-input";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import { focusInputToCursorEnd } from "@/lib/utils";
import { Comment, useDeleteComment, useUpdateComment } from "@/services/comment";
import { User } from "@/services/user";
import { EllipsisIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CommentListItemProps = {
  id: Comment["id"];
  content: string;
  author: {
    id: User["id"];
    nickname: string;
  };
  createdAt: Date;
};

export const CommentListItem = ({ id, content, author, createdAt }: CommentListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const { session } = useSession();

  const isAuthor = session && session.user.id === author.id;

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const onEditContent = (content: string) => {
    if (isUpdating) return;

    updateComment(
      { id, body: { content } },
      {
        onSuccess: () => {
          router.refresh();
          setIsEditing(false);
        },
      },
    );
  };

  const onDeleteComment = () => {
    if (isDeleting) return;

    deleteComment(id, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <li className="flex flex-col py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{author.nickname}</span>
          <span className="text-subtle text-sm font-medium">
            {formatToTimeAgo(toISOString(createdAt))}
          </span>
        </div>
        {!isEditing && (
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="더보기" size="xsmall" variant="ghost">
                <EllipsisIcon size={16} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-28" align="end">
              {isAuthor && (
                <>
                  <DropdownMenu.Item onClick={() => setIsEditing(true)}>수정하기</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={onDeleteComment}>삭제하기</DropdownMenu.Item>
                </>
              )}
              {!isAuthor && (
                <>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className="text-error">신고하기</DropdownMenu.Item>
                </>
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
        )}
        {isEditing && (
          <IconButton
            size="xsmall"
            variant="ghost"
            aria-label="취소"
            onClick={() => setIsEditing(false)}
          >
            <XIcon size={16} />
          </IconButton>
        )}
      </div>
      {!isEditing && <p className="mt-1 text-sm whitespace-pre-wrap">{content}</p>}
      {isEditing && <CommentEditForm content={content} onSubmit={onEditContent} />}
    </li>
  );
};

type CommentEditFormProps = {
  content: string;
  onSubmit: (content: string) => void;
};

const CommentEditForm = ({ content: initialContent, onSubmit }: CommentEditFormProps) => {
  const input = useInput(initialContent);

  const canSubmit = input.value.length > 0 && input.value !== initialContent;

  const onInputMount = (input: HTMLTextAreaElement | null) => {
    if (!input) return;

    focusInputToCursorEnd(input);
  };

  return (
    <CommentInput.Container className="mt-2">
      <CommentInput value={input.value} onChange={input.onChange} ref={onInputMount} />
      <CommentInput.Button onClick={() => onSubmit(input.value)} disabled={!canSubmit}>
        수정하기
      </CommentInput.Button>
    </CommentInput.Container>
  );
};
