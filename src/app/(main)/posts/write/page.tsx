"use client";

import { Button } from "@/components/ui/button";
import { ROUTE } from "@/configs/route";
import { useInput } from "@/hooks/use-input";
import { useCreatePost } from "@/services/post";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";

export default function PostWritePage() {
  const router = useRouter();

  const titleInput = useInput();
  const contentInput = useInput();

  const { mutate: createPost, isPending } = useCreatePost();

  const onSubmit = () => {
    if (isPending) return;

    createPost(
      {
        title: titleInput.value,
        content: contentInput.value,
      },
      {
        onSuccess: () => {
          router.push(ROUTE.POST.LIST);
        },
      },
    );
  };

  return (
    <main className="flex flex-col">
      <h1 className="text-2xl font-semibold">글쓰기</h1>
      <input
        value={titleInput.value}
        onChange={titleInput.onChange}
        className="mt-4 text-lg font-medium outline-none placeholder:text-placeholder"
        placeholder="제목을 입력해주세요."
      />
      <TextareaAutosize
        value={contentInput.value}
        onChange={contentInput.onChange}
        className="mt-4 min-h-[320px] outline-none placeholder:text-placeholder"
        placeholder="내용을 입력하세요."
      />
      <div className="flex justify-end">
        <Button onClick={onSubmit}>작성하기</Button>
      </div>
    </main>
  );
}
