"use client";

import { TextareaAutosize } from "@/components/primitives/textarea-autosize";
import { Button } from "@/components/ui/button";
import { ChipButton } from "@/components/ui/chip-button";
import { useInput } from "@/hooks/use-input";
import { NonEmptyArray } from "@/lib/array";
import { Category } from "@/services/category";
import { MAX_POST_CONTENT_LENGTH, MAX_POST_TITLE_LENGTH } from "@/services/post";
import { useState } from "react";

type FormData = {
  title: string;
  content: string;
  categoryId: Category["id"] | null;
};

type PostFormProps = {
  mode: "create" | "edit";
  categories: NonEmptyArray<{
    id: Category["id"];
    name: string;
  }>;
  onSubmit: (formData: FormData) => void;
  initialValues?: {
    title: string;
    content: string;
    categoryId: Category["id"] | null;
  };
};

export const PostForm = ({ mode, categories, initialValues, onSubmit }: PostFormProps) => {
  const titleInput = useInput(initialValues?.title ?? "");
  const contentInput = useInput(initialValues?.content ?? "");

  const [selectedCategoryId, setSelectedCategoryId] = useState<Category["id"] | null>(null);

  const canSubmit = titleInput.value.length > 0 && contentInput.value.length > 0;

  const handleSubmit = () => {
    onSubmit({
      title: titleInput.value,
      content: contentInput.value,
      categoryId: selectedCategoryId,
    });
  };

  const title = {
    create: "게시글 작성",
    edit: "게시글 수정",
  } as const;

  const submitButtonLabel = {
    create: "작성하기",
    edit: "수정하기",
  } as const;

  return (
    <main className="flex flex-col">
      <h1 className="text-2xl font-semibold">{title[mode]}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <ChipButton
          variant={selectedCategoryId === null ? "primary" : "secondary"}
          size="xsmall"
          className="rounded-lg"
          onClick={() => setSelectedCategoryId(null)}
        >
          전체
        </ChipButton>
        {categories.map((category) => (
          <ChipButton
            variant={selectedCategoryId === category.id ? "primary" : "secondary"}
            size="xsmall"
            key={category.id}
            className="rounded-lg"
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </ChipButton>
        ))}
      </div>
      <input
        value={titleInput.value}
        onChange={titleInput.onChange}
        className="mt-4 text-lg font-medium outline-hidden placeholder:text-placeholder"
        placeholder="제목을 입력해주세요."
        maxLength={MAX_POST_TITLE_LENGTH}
      />
      <TextareaAutosize
        value={contentInput.value}
        onChange={contentInput.onChange}
        className="mt-4 min-h-[320px] outline-hidden placeholder:text-placeholder"
        placeholder="내용을 입력하세요."
        maxLength={MAX_POST_CONTENT_LENGTH}
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {submitButtonLabel[mode]}
        </Button>
      </div>
    </main>
  );
};
