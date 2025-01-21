import { getPosts } from "@/actions/post";
import { ROUTE } from "@/configs/route";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { createLoader, parseAsFloat, parseAsString, SearchParams } from "nuqs/server";
import { PostListItem } from "./_components/post-list-item";
import { SearchInput } from "./_components/search-input";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const pageSearchParams = {
  page: parseAsFloat.withDefault(1),
  limit: parseAsFloat.withDefault(20),
  search: parseAsString.withDefault(""),
};

const loadSearchParams = createLoader(pageSearchParams);

export default async function PostListPage(page: PageProps) {
  const searchParams = await loadSearchParams(page.searchParams);

  const { posts, total } = await getPosts({
    page: searchParams.page,
    limit: searchParams.limit,
    search: searchParams.search,
  });

  return (
    <main>
      <h1 className="text-2xl font-semibold">커뮤니티</h1>
      <ul className="-mx-page mt-4 divide-y divide-border">
        {posts.map((post) => (
          <PostListItem key={post.id} {...post} />
        ))}
      </ul>
      <Pagination page={searchParams.page} limit={searchParams.limit} total={total} />
      <div className="mt-4">
        <SearchInput initialValue={searchParams.search} />
      </div>
    </main>
  );
}

type PaginationProps = {
  page: number;
  limit: number;
  total: number;
};

const Pagination = ({ page, limit, total }: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-between">
      <Link
        className={cn("inline-flex h-9 items-center gap-1", page === 1 && "invisible")}
        href={{
          pathname: ROUTE.POST.LIST,
          query: { page: page - 1 },
        }}
      >
        <ChevronLeftIcon size={18} />
        이전
      </Link>
      <span>{page}</span>
      <Link
        className={cn(page * limit >= total && "invisible")}
        href={{
          pathname: ROUTE.POST.LIST,
          query: { page: page + 1 },
        }}
      >
        다음
      </Link>
    </div>
  );
};
