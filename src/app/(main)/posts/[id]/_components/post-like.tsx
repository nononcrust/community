"use client";

import { cn } from "@/lib/utils";
import { useCreatePostLike } from "@/services/post";
import { Post } from "@prisma/client";
import { ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

type PostLikeProps = {
  post: {
    id: Post["id"];
  };
  likedByMe: boolean;
  likeCount: number;
};

export const PostLike = ({
  post,
  likedByMe: initialLikedByMe,
  likeCount: initialLikeCount,
}: PostLikeProps) => {
  const [likedByMe, setLikedByMe] = useState(initialLikedByMe);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const { mutate: createPostLike } = useCreatePostLike();

  const likePost = () => {
    if (likedByMe) return;

    createPostLike(post.id);
    setLikeCount((prev) => prev + 1);
    setLikedByMe(true);
  };

  return (
    <div className="mt-2 flex justify-center">
      <button
        disabled={likedByMe}
        className={cn(
          "flex w-[72px] flex-col items-center gap-2 rounded-xl border border-border pb-2 pt-3 transition-colors hover:bg-background-hover",
          likedByMe && "border-primary bg-primary-lighter hover:bg-primary-lighter",
        )}
        onClick={likePost}
      >
        <ThumbsUpIcon className="text-primary" size={18} />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>
    </div>
  );
};
