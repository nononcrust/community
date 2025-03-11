import { env } from "@/env";
import { Session } from "@/features/auth/session";
import { Duration } from "@/lib/duration";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign, verify } from "hono/jwt";

export const SESSION_TOKEN_KEY = "auth.session-token";

const sessionTokenConfig = {
  expiresIn: Math.floor(Date.now() / 1000) + Duration.days(30),
} as const;

export const JWT_SECRET = env.JWT_SECRET;

const issueSessionToken = async (payload: Session, c: Context) => {
  const jwtPayload = {
    ...payload,
    exp: sessionTokenConfig.expiresIn,
  };

  const sessionToken = await sign(jwtPayload, JWT_SECRET);

  setCookie(c, SESSION_TOKEN_KEY, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return sessionToken;
};

const verifySessionToken = async (c: Context) => {
  const token = getCookie(c, SESSION_TOKEN_KEY);

  if (!token) {
    return null;
  }

  try {
    return Session.parse(await verify(token, JWT_SECRET));
  } catch {
    return null;
  }
};

const clearSessionToken = (c: Context) => {
  setCookie(c, SESSION_TOKEN_KEY, "", { expires: new Date(0) });
};

export const sessionTokens = (c: Context) => {
  return {
    get: () => getCookie(c, SESSION_TOKEN_KEY),
    issue: (payload: Session) => issueSessionToken(payload, c),
    verify: () => verifySessionToken(c),
    clear: () => clearSessionToken(c),
  };
};

export const getServerSession = async (c: Context) => {
  const sessionToken = sessionTokens(c);

  const verifiedToken = await sessionToken.verify();

  if (!verifiedToken) {
    return null;
  }

  return verifiedToken;
};

export const getAuthenticatedServerSession = async (c: Context) => {
  const session = await getServerSession(c);

  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return session;
};
