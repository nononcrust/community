"use client";

import { PostForm } from "@/components/post/post-form";
import { ROUTE } from "@/configs/route";
import { NonEmptyArray } from "@/lib/array";
import { Category } from "@/services/category";
import { useCreatePost } from "@/services/post";
import { useRouter } from "next/navigation";

type PostWriteFormProps = {
  categories: NonEmptyArray<{
    id: Category["id"];
    name: string;
  }>;
};

export const PostWriteForm = ({ categories }: PostWriteFormProps) => {
  const router = useRouter();

  const { mutate: createPost, isPending } = useCreatePost();

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

    createPost(
      {
        title,
        content,
        categoryId: categoryId ?? undefined,
      },
      {
        onSuccess: () => {
          router.push(ROUTE.POST.LIST);
        },
      },
    );
  };

  return <PostForm mode="create" categories={categories} onSubmit={onSubmit} />;
};
