import { ROUTE } from "@/configs/route";
import { formatToTimeAgo, toISOString } from "@/lib/date";
import Link from "next/link";

type PostListItemProps = {
  id: string;
  title: string;
  content: string;
  author: {
    nickname: string;
  };
  createdAt: Date;
};

export const PostListItem = ({ id, title, author, createdAt }: PostListItemProps) => {
  return (
    <li>
      <Link className="px-page flex flex-col py-2" href={ROUTE.POST.DETAIL(id)}>
        <span className="line-clamp-1 text-sm font-medium">{title}</span>
        <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-sub">
          <span>{author.nickname}</span>
          <span>{formatToTimeAgo(toISOString(createdAt))}</span>
        </div>
      </Link>
    </li>
  );
};
