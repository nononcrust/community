import { App } from "@/server";
import { hc } from "hono/client";
import ky from "ky";

const kyClient = ky.create({
  retry: 0,
});

export const { api } = hc<App>("/", {
  fetch: kyClient,
});

export const QUERY_KEY = {
  POST: {
    LIST: ["posts"],
    DETAIL: (id: string) => ["posts", id],
  },
  COMMENT: {
    LIST: ["comments"],
    DETAIL: (id: string) => ["comments", id],
  },
};
