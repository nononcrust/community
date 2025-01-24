"use client";

import { PostForm } from "@/components/post/post-form";
import { ROUTE } from "@/configs/route";
import { NonEmptyArray } from "@/lib/array";
import { Post, useUpdatePost } from "@/services/post";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

type PostEditFormProps = {
  post: {
    id: Post["id"];
    title: string;
    content: string;
    categoryId: Category["id"] | null;
  };
  categories: NonEmptyArray<{
    id: Category["id"];
    name: string;
  }>;
};

export const PostEditForm = ({ post, categories }: PostEditFormProps) => {
  const router = useRouter();

  const { mutate: updatePost, isPending } = useUpdatePost();

  const onSubmit = ({
    title,
    content,
    categoryId,
  }: {
    title: string;
    content: string;
    categoryId: Category["id"] | null;
  }) => {
    if (isPending) return;

    updatePost(
      {
        id: post.id,
        body: {
          title,
          content,
          categoryId: categoryId ?? undefined,
        },
      },
      {
        onSuccess: () => {
          router.push(ROUTE.POST.DETAIL(post.id));
        },
      },
    );
  };

  const initialValues = {
    title: post.title,
    content: post.content,
    categoryId: post.categoryId,
  };

  return (
    <PostForm
      mode="edit"
      categories={categories}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
};
