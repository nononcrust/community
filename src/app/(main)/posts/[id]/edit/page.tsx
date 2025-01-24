import { getAllCategories } from "@/services/category";
import { getPostById } from "@/services/post";
import { PostEditForm } from "./_components/post-edit-form";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostEditPage(page: PageProps) {
  const params = await page.params;
  const postId = params.id;

  const categories = await getAllCategories();

  const post = await getPostById(postId);

  return <PostEditForm categories={categories} post={post} />;
}
