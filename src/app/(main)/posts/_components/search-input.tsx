"use client";

import { Button } from "@/components/ui/button";
import { useInput } from "@/hooks/use-input";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

type SearchInputProps = {
  initialValue: string;
};

export const SearchInput = ({ initialValue }: SearchInputProps) => {
  const input = useInput(initialValue);
  const { updateSearchParams } = useUpdateSearchParams();

  const onSearch = () => {
    updateSearchParams({
      search: input.value,
      page: null,
    });
  };

  return (
    <div className="flex gap-2">
      <input
        value={input.value}
        onChange={input.onChange}
        className="h-9 rounded-md border border-gray-300 bg-background px-3 text-sm outline-hidden"
        placeholder="검색어를 입력해주세요."
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button variant="outlined" onClick={onSearch}>
        검색
      </Button>
    </div>
  );
};
