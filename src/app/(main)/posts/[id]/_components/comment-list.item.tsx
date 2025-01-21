import { IconButton } from "@/components/ui/icon-button";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import { EllipsisIcon } from "lucide-react";

type CommentListItemProps = {
  id: string;
  content: string;
  author: {
    nickname: string;
  };
  createdAt: Date;
};

export const CommentListItem = ({ content, author, createdAt }: CommentListItemProps) => {
  return (
    <li className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">{author.nickname}</span>
          <span className="font-medium text-subtle">{formatToTimeAgo(toISOString(createdAt))}</span>
        </div>
        <IconButton aria-label="더보기" size="small" variant="ghost">
          <EllipsisIcon size={16} />
        </IconButton>
      </div>
      <p className="mt-1">{content}</p>
    </li>
  );
};
