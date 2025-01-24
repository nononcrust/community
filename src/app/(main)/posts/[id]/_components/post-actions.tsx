"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { ROUTE } from "@/configs/route";
import { useSession } from "@/features/auth/use-session";
import { useDeletePost } from "@/services/post";
import { Post, User } from "@prisma/client";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostActionsProps = {
  post: {
    id: Post["id"];
  };
  author: {
    id: User["id"];
  };
};

export const PostActions = ({ post, author }: PostActionsProps) => {
  const { session } = useSession();

  const router = useRouter();

  const isAuthor = session && session.user.id === author.id;

  const { mutate: deletePost } = useDeletePost();

  const onDeletePost = () => {
    deletePost(post.id, {
      onSuccess: () => {
        router.replace(ROUTE.POST.LIST);
      },
    });
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <Dialog.Trigger asChild>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="더보기" size="xsmall" variant="ghost">
                <EllipsisIcon size={16} />
              </IconButton>
            </DropdownMenu.Trigger>
          </Dialog.Trigger>
          <DropdownMenu.Content className="min-w-28" align="end">
            {isAuthor && (
              <>
                <DropdownMenu.Item asChild>
                  <Link className="disable-focus-ring" href={ROUTE.POST.EDIT(post.id)}>
                    수정하기
                  </Link>
                </DropdownMenu.Item>
                <Dialog.Trigger asChild>
                  <DropdownMenu.Item>삭제하기</DropdownMenu.Item>
                </Dialog.Trigger>
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
        <Dialog.Content className="max-w-[320px]">
          <Dialog.Title>게시글 삭제</Dialog.Title>
          <Dialog.Description>게시글을 삭제할까요?</Dialog.Description>
          <Dialog.Footer className="mt-6">
            <Dialog.Close asChild>
              <Button variant="secondary">취소</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button onClick={onDeletePost}>삭제하기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
