import { prisma } from "@/server/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export type CreatePostRequestBody = z.infer<typeof CreatePostRequestBody>;
export const CreatePostRequestBody = z.object({
  title: z.string(),
  content: z.string(),
});

export const post = new Hono().post("/", zValidator("json", CreatePostRequestBody), async (c) => {
  const body = c.req.valid("json");

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: "cm65x53v100009kze57d5vu1g",
    },
  });

  return c.json(post, 201);
});
