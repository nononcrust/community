import { Hono } from "hono";
import { logger } from "hono/logger";
import { comment } from "./routes/comment";
import { post } from "./routes/post";

export const app = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/posts", post)
  .route("/comments", comment);

export type App = typeof app;
