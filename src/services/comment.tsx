import { CreateCommentRequestBody } from "@/server/routes/comment";
import { useMutation } from "@tanstack/react-query";
import { api } from "./shared";

export const commentApi = {
  createComment: (body: CreateCommentRequestBody) => {
    return api.comments.$post({
      json: body,
    });
  },
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: commentApi.createComment,
  });
};
