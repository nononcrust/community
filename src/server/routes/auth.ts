import { ROUTE } from "@/configs/route";
import { prisma } from "@/server/lib/prisma";
import { GoogleCallbackSearchParams, googleClient } from "@/services/google";
import { zValidator } from "@hono/zod-validator";
import { Provider } from "@prisma/client";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { z } from "zod";
import { sessionTokens } from "../lib/session";

export type SocialSignupRequestBody = z.infer<typeof SocialSignupRequestBody>;
export const SocialSignupRequestBody = z.object({
  email: z.string().email(),
  nickname: z.string(),
  provider: z.nativeEnum(Provider),
  providerId: z.string(),
});

export const auth = new Hono()
  .get("/callback/google", zValidator("query", GoogleCallbackSearchParams), async (c) => {
    const searchParams = c.req.valid("query");
    const sessionToken = sessionTokens(c);

    const { name, email, sub } = await googleClient.getUserInfo(searchParams.code);

    const existingUser = await prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider: Provider.GOOGLE,
            providerId: sub,
          },
        },
      },
    });

    if (existingUser) {
      await sessionToken.issue({ user: { id: existingUser.id } });

      return c.redirect(ROUTE.HOME);
    }

    const existingUserWithSameEmail = await prisma.user.findFirst({
      where: {
        email: name,
      },
    });

    if (existingUserWithSameEmail) {
      return c.redirect(ROUTE.AUTH.SAME_EMAIL);
    }

    setCookie(
      c,
      "provider",
      JSON.stringify({ name, email, providerId: sub, provider: Provider.GOOGLE }),
    );

    return c.redirect(ROUTE.AUTH.SIGNUP.SOCIAL);
  })
  .post("/signup/social", zValidator("json", SocialSignupRequestBody), async (c) => {
    const body = c.req.valid("json");

    await prisma.user.create({
      data: {
        email: body.email,
        nickname: body.nickname,
        accounts: {
          create: {
            provider: body.provider,
            providerId: body.providerId,
          },
        },
      },
    });

    return c.json({ message: "회원가입이 완료되었습니다." }, 201);
  })
  .post("/logout", async (c) => {
    const sessionToken = sessionTokens(c);

    sessionToken.clear();

    return c.json({ message: "로그아웃 되었습니다." }, 200);
  });
