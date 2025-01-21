import { prisma } from "@/server/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const GetPostsRequestQuery = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
});

export const post = new Hono().get("/", zValidator("query", GetPostsRequestQuery), async (c) => {
  const posts = await prisma.post.findMany();
  const total = await prisma.post.count();

  return c.json(
    {
      posts,
      total,
    },
    200,
  );
});
