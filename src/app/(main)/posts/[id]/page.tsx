import { getPostById } from "@/actions/post";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import { CommentForm } from "./_components/comment-form";
import { CommentListItem } from "./_components/comment-list.item";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage(page: PageProps) {
  const params = await page.params;
  const postId = params.id;

  const post = await getPostById(postId);

  return (
    <main>
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <div className="mt-2 flex items-center gap-3 font-medium">
        <span>{post.author.nickname}</span>
        <span className="text-subtle">{formatToTimeAgo(toISOString(post.createdAt))}</span>
      </div>
      <p className="whitespace-pre-wrap py-12">{post.content}</p>
      <h2 className="text-xl font-semibold">
        댓글 <span className="text-primary">{post._count.comments}</span>
      </h2>
      {post.comments.length > 0 && (
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {post.comments.map((comment) => (
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
      <CommentForm />
    </main>
  );
}
