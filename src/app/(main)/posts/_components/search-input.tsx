"use client";

import { Button } from "@/components/ui/button";
import { useInput } from "@/hooks/use-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchInputProps = {
  initialValue: string;
};

export const SearchInput = ({ initialValue }: SearchInputProps) => {
  const input = useInput(initialValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("search", input.value);

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="flex gap-2">
      <input
        value={input.value}
        onChange={input.onChange}
        className="h-9 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none"
        placeholder="검색어를 입력해주세요."
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button variant="outlined" onClick={onSearch}>
        검색
      </Button>
    </div>
  );
};
