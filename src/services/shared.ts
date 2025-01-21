import { App } from "@/server";
import { hc } from "hono/client";
import ky from "ky";

const kyClient = ky.create();

export const { api } = hc<App>("/", {
  fetch: kyClient,
});

export const QUERY_KEY = {
  POST: {
    LIST: ["posts"],
  },
};
