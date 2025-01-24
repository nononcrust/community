import { Button } from "@/components/ui/button";
import { ROUTE } from "@/configs/route";
import { mapNonEmptyArray } from "@/lib/array";
import { getTotalPages } from "@/server/lib/pagination";
import { getAllCategories } from "@/services/category";
import { getAllPosts } from "@/services/post";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createLoader, SearchParams } from "nuqs/server";
import { CategoryTabs } from "./_components/category-tabs";
import { Pagination } from "./_components/pagination";
import { PostEmptyState } from "./_components/post-empty-state";
import { PostListItem } from "./_components/post-list-item";
import { SearchInput } from "./_components/search-input";
import { createCategorySearchParamsSchema, postSearchParamsSchema } from "./_utils/search-params";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const loadPostSearchParams = createLoader(postSearchParamsSchema);

export default async function PostListPage({ searchParams }: PageProps) {
  const categories = await getAllCategories();

  const categoryIds = mapNonEmptyArray(categories, (category) => category.id);

  const categorySearchParamsSchema = createCategorySearchParamsSchema(categoryIds);

  const loadCategorySearchParams = createLoader(categorySearchParamsSchema);

  const allSearchParams = await searchParams;

  const { page, limit, search } = await loadPostSearchParams(searchParams);
  const categorySearchParams = await loadCategorySearchParams(searchParams);

  const { posts, total } = await getAllPosts({
    page: page,
    limit: limit,
    search: search,
    category: categorySearchParams.category ?? undefined,
  });

  const totalPages = getTotalPages(total, limit);

  if (page > 1 && page > totalPages) {
    redirect(ROUTE.POST.LIST);
  }

  return (
    <main>
      <div className="relative flex items-center justify-between">
        <h1 className="text-2xl font-semibold">커뮤니티</h1>
        <Button asChild className="absolute right-0 top-1/2 -translate-y-1/2">
          <Link href={ROUTE.POST.WRITE}>글쓰기</Link>
        </Button>
      </div>
      <CategoryTabs categories={categories} selectedCategoryId={categorySearchParams.category} />
      {search && (
        <span className="mt-6 flex font-semibold text-primary">
          {search}
          <span className="ml-1 font-medium text-main">키워드 검색 결과</span>
        </span>
      )}
      <ul className="-mx-page mt-4 divide-y divide-border">
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            category={post.category}
            commentCount={post._count.comments}
            likeCount={post._count.likes}
            viewCount={post._count.views}
            createdAt={post.createdAt}
            searchParams={allSearchParams}
            hasImage={false}
          />
        ))}
      </ul>
      {posts.length === 0 && <PostEmptyState />}
      {posts.length > 0 && <Pagination page={page} limit={limit} total={total} />}
      <div className="mt-4 flex justify-center">
        <SearchInput initialValue={search} />
      </div>
    </main>
  );
}
