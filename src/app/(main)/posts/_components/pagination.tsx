"use client";

import { SearchLink } from "@/components/shared/search-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationProps = {
  page: number;
  limit: number;
  total: number;
};

export const Pagination = ({ page, limit, total }: PaginationProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page * limit >= total;

  return (
    <div className="mt-4 flex justify-between">
      <Button asChild variant="outlined" className={cn(isFirstPage && "invisible")}>
        <SearchLink
          query={{
            page: page - 1,
          }}
        >
          <ChevronLeftIcon size={18} />
          이전
        </SearchLink>
      </Button>
      <span className="font-medium">{page}</span>
      <Button asChild variant="outlined" className={cn(isLastPage && "invisible")}>
        <SearchLink
          query={{
            page: page + 1,
          }}
        >
          다음
          <ChevronRightIcon size={18} />
        </SearchLink>
      </Button>
    </div>
  );
};
