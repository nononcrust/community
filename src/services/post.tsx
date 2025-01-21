import { CreatePostRequestBody } from "@/server/routes/post";
import { useMutation } from "@tanstack/react-query";
import { api } from "./shared";

export const postApi = {
  createPost: (body: CreatePostRequestBody) => {
    return api.posts.$post({
      json: body,
    });
  },
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: postApi.createPost,
  });
};
