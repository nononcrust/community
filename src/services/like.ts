import { prisma } from "@/server/lib/prisma";
import { Post } from "@/services/post";
import { Like } from "@prisma/client";
import { USER_ID } from "./user";

export const getLikeInfo = async (postId: Post["id"]) => {
  const [likeCount, likeByMe] = await prisma.$transaction([
    prisma.like.count({
      where: {
        postId,
      },
    }),
    prisma.like.findFirst({
      where: {
        postId,
        userId: USER_ID,
      },
    }),
  ]);

  return {
    likeCount,
    likedByMe: !!likeByMe,
  };
};

export type { Like };
