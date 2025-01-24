import { Chip } from "@/components/ui/chip";
import { ROUTE } from "@/configs/route";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import { Post } from "@/services/post";
import { EyeIcon, ImageIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";

type PostListItemProps = {
  id: Post["id"];
  title: string;
  content: string;
  category: {
    name: string;
  } | null;
  author: {
    nickname: string;
  };
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  searchParams: SearchParams;
  hasImage: boolean;
};

export const PostListItem = async ({
  id,
  title,
  author,
  createdAt,
  category,
  commentCount,
  likeCount,
  viewCount,
  searchParams,
  hasImage,
}: PostListItemProps) => {
  return (
    <li>
      <Link
        className="hover:bg-background-50 px-page flex flex-col py-2"
        href={{ pathname: ROUTE.POST.DETAIL(id), query: searchParams }}
      >
        <div className="flex items-center">
          <span className="line-clamp-1 text-sm font-medium">
            {category && (
              <Chip className="mr-2" variant="secondary">
                {category.name}
              </Chip>
            )}
            {title}
          </span>
          {hasImage && <ImageIcon className="ml-1.5 flex h-full shrink-0 text-sub" size={14} />}
          {commentCount > 0 && (
            <span className="ml-1.5 -translate-y-[1px] text-sm leading-none text-primary">
              [{commentCount}]
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-sub">
          <span>{author.nickname}</span>
          <span>{formatToTimeAgo(toISOString(createdAt))}</span>
          <span className="ml-1 flex items-center gap-[3px] text-xs">
            <EyeIcon className="text-subtle" size={12} />
            {viewCount}
          </span>
          {likeCount > 0 && (
            <span className="ml-1 flex items-center gap-[3px] text-xs">
              <ThumbsUpIcon className="text-primary" size={12} />
              {likeCount}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
};
