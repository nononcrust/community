import { prisma } from "@/server/lib/prisma";
import { CreateCommentRequestBody, UpdateCommentRequestBody } from "@/server/routes/comment";
import { Post } from "@/services/post";
import { Comment } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { api } from "./shared";

export const MAX_COMMENT_CONTENT_LENGTH = 1000;

export const commentApi = {
  createComment: (body: CreateCommentRequestBody) => {
    return api.comments.$post({
      json: body,
    });
  },
  updateComment: ({ id, body }: { id: Comment["id"]; body: UpdateCommentRequestBody }) => {
    return api.comments[":id"].$put({
      param: {
        id,
      },
      json: body,
    });
  },
  deleteComment: (id: Comment["id"]) => {
    return api.comments[":id"].$delete({
      param: {
        id,
      },
    });
  },
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: commentApi.createComment,
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: commentApi.updateComment,
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: commentApi.deleteComment,
  });
};

export const getAllComments = async (postId: Post["id"]) => {
  const where = {
    postId,
  };

  const [comments, total] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    comments,
    total,
  };
};

export type { Comment };
