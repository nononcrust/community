import { prisma } from "@/server/lib/prisma";
import { MAX_COMMENT_CONTENT_LENGTH } from "@/services/comment";
import { USER_ID } from "@/services/user";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export type CreateCommentRequestBody = z.infer<typeof CreateCommentRequestBody>;
export const CreateCommentRequestBody = z.object({
  postId: z.string(),
  content: z.string().min(1).max(MAX_COMMENT_CONTENT_LENGTH),
});

export type UpdateCommentRequestBody = z.infer<typeof UpdateCommentRequestBody>;
export const UpdateCommentRequestBody = z.object({
  content: z.string().min(1).max(MAX_COMMENT_CONTENT_LENGTH),
});

export const comment = new Hono()
  .post("/", zValidator("json", CreateCommentRequestBody), async (c) => {
    const body = c.req.valid("json");

    const post = await prisma.comment.create({
      data: {
        postId: body.postId,
        content: body.content,
        authorId: USER_ID,
      },
    });

    return c.json(post, 201);
  })
  .put("/:id", zValidator("json", UpdateCommentRequestBody), async (c) => {
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        content: body.content,
      },
    });

    return c.json(comment, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return c.json(204);
  });
