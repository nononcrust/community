import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ROUTE } from "@/configs/route";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import { getAllComments } from "@/services/comment";
import { getLikeInfo } from "@/services/like";
import { getPostById } from "@/services/post";
import { USER_ID } from "@/services/user";
import { view } from "@/services/view";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import { CommentForm } from "./_components/comment-form";
import { CommentListItem } from "./_components/comment-list.item";
import { PostActions } from "./_components/post-actions";
import { PostLike } from "./_components/post-like";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function PostDetailPage(page: PageProps) {
  const params = await page.params;
  const postId = params.id;

  const allSearchParams = await page.searchParams;

  await view({
    postId,
    viewer: {
      type: "user",
      id: USER_ID,
    },
  });

  const post = await getPostById(postId);
  const { comments, total: commentCount } = await getAllComments(post.id);
  const { likeCount, likedByMe } = await getLikeInfo(post.id);

  return (
    <main>
      <h1 className="text-xl font-semibold">
        {post.category !== null && (
          <Chip variant="secondary" className="mr-2 align-middle">
            {post.category.name}
          </Chip>
        )}
        <span className="align-middle">{post.title}</span>
      </h1>
      <div className="mt-2 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span>{post.author.nickname}</span>
          <span className="text-sm text-subtle">
            {formatToTimeAgo(toISOString(post.createdAt))}
          </span>
          <span className="text-sm text-subtle">조회 {post._count.views}</span>
        </div>
        <PostActions post={post} author={post.author} />
      </div>
      <p className="whitespace-pre-wrap py-12">{post.content}</p>
      <PostLike post={post} likedByMe={likedByMe} likeCount={likeCount} />
      <h2 className="text-xl font-semibold">
        댓글 <span className="text-primary">{commentCount}</span>
      </h2>
      {comments.length > 0 && (
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {comments.map((comment) => (
            <CommentListItem
              key={comment.id}
              id={comment.id}
              content={comment.content}
              author={comment.author}
              createdAt={comment.createdAt}
            />
          ))}
        </ul>
      )}
      <CommentForm postId={postId} />
      <Button className="mt-4" variant="secondary" asChild>
        <Link
          href={{
            pathname: ROUTE.POST.LIST,
            query: allSearchParams,
          }}
        >
          목록으로
        </Link>
      </Button>
    </main>
  );
}
