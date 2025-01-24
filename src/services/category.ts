import { isNonEmptyArray, NonEmptyArray } from "@/lib/array";
import { prisma } from "@/server/lib/prisma";
import { Category } from "@prisma/client";

export const ALL_CATEGORY = "전체";

export const getAllCategories = async (): Promise<NonEmptyArray<Category>> => {
  const categories = await prisma.category.findMany();

  if (!isNonEmptyArray(categories)) {
    throw new Error("카테고리가 존재하지 않습니다.");
  }

  return categories;
};

export type { Category };
