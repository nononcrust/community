import { Hono } from "hono";
import { logger } from "hono/logger";
import { post } from "./routes/post";

export const app = new Hono().basePath("/api").use(logger()).route("/posts", post);

export type App = typeof app;
