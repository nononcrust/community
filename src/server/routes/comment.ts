import { prisma } from "@/server/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export type CreateCommentRequestBody = z.infer<typeof CreateCommentRequestBody>;
export const CreateCommentRequestBody = z.object({
  postId: z.string(),
  content: z.string(),
});

export const comment = new Hono().post(
  "/",
  zValidator("json", CreateCommentRequestBody),
  async (c) => {
    const body = c.req.valid("json");

    const post = await prisma.comment.create({
      data: {
        postId: body.postId,
        content: body.content,
        authorId: "cm65x53v100009kze57d5vu1g",
      },
    });

    return c.json(post, 201);
  },
);
