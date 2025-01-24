"use client";

import { SearchLink } from "@/components/shared/search-link";
import { ChipButton } from "@/components/ui/chip-button";
import { NonEmptyArray } from "@/lib/array";
import { Category } from "@/services/category";

type CategoryTabsProps = {
  selectedCategoryId: Category["id"] | null;
  categories: NonEmptyArray<{
    id: Category["id"];
    name: string;
  }>;
};

export const CategoryTabs = ({ categories, selectedCategoryId }: CategoryTabsProps) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <ChipButton
        className="rounded-lg"
        variant={selectedCategoryId === null ? "primary" : "secondary"}
        size="xsmall"
        asChild
      >
        <SearchLink query={{ category: null, page: null }}>전체</SearchLink>
      </ChipButton>
      {categories.map((category) => (
        <ChipButton
          key={category.id}
          className="rounded-lg"
          variant={selectedCategoryId === category.id ? "primary" : "secondary"}
          size="xsmall"
          asChild
        >
          <SearchLink query={{ category: category.id, page: null }}>{category.name}</SearchLink>
        </ChipButton>
      ))}
    </div>
  );
};
