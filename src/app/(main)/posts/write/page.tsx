import { getAllCategories } from "@/services/category";
import { PostWriteForm } from "./_components/post-write-form";

export const dynamic = "force-dynamic";

export default async function PostWritePage() {
  const categories = await getAllCategories();

  return <PostWriteForm categories={categories} />;
}
