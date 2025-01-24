import { prisma } from "@/server/lib/prisma";
import { MAX_POST_CONTENT_LENGTH, MAX_POST_TITLE_LENGTH } from "@/services/post";
import { USER_ID } from "@/services/user";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export type CreatePostRequestBody = z.infer<typeof CreatePostRequestBody>;
export const CreatePostRequestBody = z.object({
  title: z.string().min(1).max(MAX_POST_TITLE_LENGTH),
  content: z.string().min(1).max(MAX_POST_CONTENT_LENGTH),
  categoryId: z.string().optional(),
});

export type UpdatePostRequestBody = z.infer<typeof UpdatePostRequestBody>;
export const UpdatePostRequestBody = z.object({
  title: z.string().min(1).max(MAX_POST_TITLE_LENGTH),
  content: z.string().min(1).max(MAX_POST_CONTENT_LENGTH),
  categoryId: z.string().optional(),
});

export const post = new Hono()
  .post("/", zValidator("json", CreatePostRequestBody), async (c) => {
    const body = c.req.valid("json");

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: USER_ID,
        categoryId: body.categoryId,
      },
    });

    return c.json(post, 201);
  })
  .put("/:id", zValidator("json", UpdatePostRequestBody), async (c) => {
    const body = c.req.valid("json");
    const id = c.req.param("id");

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        content: body.content,
        categoryId: body.categoryId,
      },
    });

    return c.json(post, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return c.json(204);
  })
  .post("/:id/like", async (c) => {
    const id = c.req.param("id");

    const like = await prisma.like.create({
      data: {
        postId: id,
        userId: USER_ID,
      },
    });

    return c.json(like, 201);
  })
  .delete("/:id/like", async (c) => {
    const id = c.req.param("id");

    await prisma.like.deleteMany({
      where: {
        postId: id,
        userId: USER_ID,
      },
    });

    return c.json(204);
  });
