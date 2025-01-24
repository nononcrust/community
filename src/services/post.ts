import { prisma } from "@/server/lib/prisma";
import { CreatePostRequestBody, UpdatePostRequestBody } from "@/server/routes/post";
import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { api } from "./shared";

export const MAX_POST_TITLE_LENGTH = 100;
export const MAX_POST_CONTENT_LENGTH = 2000;

export const postApi = {
  createPost: (body: CreatePostRequestBody) => {
    return api.posts.$post({
      json: body,
    });
  },
  updatePost: ({ id, body }: { id: Post["id"]; body: UpdatePostRequestBody }) => {
    return api.posts[":id"].$put({
      param: {
        id,
      },
      json: body,
    });
  },
  deletePost: (id: Post["id"]) => {
    return api.posts[":id"].$delete({
      param: {
        id,
      },
    });
  },
  createPostLike: (id: Post["id"]) => {
    return api.posts[":id"].like.$post({
      param: {
        id,
      },
    });
  },
  deletePostLike: (id: Post["id"]) => {
    return api.posts[":id"].like.$delete({
      param: {
        id,
      },
    });
  },
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: postApi.createPost,
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: postApi.updatePost,
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: postApi.deletePost,
  });
};

export const useCreatePostLike = () => {
  return useMutation({
    mutationFn: postApi.createPostLike,
  });
};

export const useDeletePostLike = () => {
  return useMutation({
    mutationFn: postApi.deletePostLike,
  });
};

export const getAllPosts = async (params: {
  page: number;
  limit: number;
  search: string;
  category?: string;
}) => {
  const where = {
    title: {
      contains: params.search,
    },
    category: {
      id: params.category,
    },
  };

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            nickname: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
            views: true,
          },
        },
      },
    }),
    prisma.post.count({
      where,
    }),
  ]);

  return {
    posts,
    total,
  };
};

export const getPostById = async (id: Post["id"]) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          nickname: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          views: true,
        },
      },
    },
  });

  return post;
};

export type { Post };
