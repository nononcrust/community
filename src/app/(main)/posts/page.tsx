import { usePosts } from "@/services/post";
import { Suspense } from "@suspensive/react";

export default function PostListPage() {
  return (
    <main>
      <Suspense clientOnly>
        <PostList />
      </Suspense>
    </main>
  );
}

const PostList = () => {
  const { data: posts } = usePosts({
    query: {
      page: "1",
      search: "",
    },
  });

  return <ul>{JSON.stringify(posts)}</ul>;
};
