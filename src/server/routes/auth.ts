import { ROUTE } from "@/configs/route";
import { prisma } from "@/server/lib/prisma";
import { GoogleCallbackSearchParams, googleClient } from "@/services/google";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";

export const auth = new Hono().get(
  "/callback/google",
  zValidator("query", GoogleCallbackSearchParams),
  async (c) => {
    const searchParams = c.req.valid("query");

    const { name, email, sub } = await googleClient.getUserInfo(searchParams.code);

    const existingUser = await prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider: "GOOGLE",
            providerId: sub,
          },
        },
      },
    });

    if (existingUser) {
      // TODO: 로그인 처리
    }

    const existingUserWithSameEmail = await prisma.user.findFirst({
      where: {
        email: name,
      },
    });

    if (existingUserWithSameEmail) {
      return c.redirect(ROUTE.AUTH.SAME_EMAIL);
    }

    const redirectToSignup = () => {
      setCookie(c, "provider", JSON.stringify({ name, email, sub }));

      return c.redirect(ROUTE.AUTH.SIGNUP.SOCIAL);
    };

    return redirectToSignup();
  },
);
