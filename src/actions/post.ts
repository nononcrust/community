import { prisma } from "@/server/lib/prisma";

export const getPosts = async (params: { page: number; limit: number; search: string }) => {
  const posts = await prisma.post.findMany({
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    where: {
      title: {
        contains: params.search,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          nickname: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const total = await prisma.post.count();

  return {
    posts,
    total,
  };
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          nickname: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              nickname: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return post;
};
