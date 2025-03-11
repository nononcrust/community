import { SESSION_TOKEN_KEY } from "@/server/lib/session";
import * as jose from "jose";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { z } from "zod";

export type Session = z.infer<typeof Session>;
export const Session = z.object({
  user: z.object({
    id: z.string(),
  }),
});

export const getSession = async (cookieStore: ReadonlyRequestCookies): Promise<Session | null> => {
  const sessionToken = cookieStore.get(SESSION_TOKEN_KEY);

  if (!sessionToken) {
    return null;
  }

  return Session.parse(jose.decodeJwt(sessionToken.value));
};
