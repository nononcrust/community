import { env } from "@/env";
import * as jose from "jose";
import ky from "ky";
import { z } from "zod";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const CLIENT_ID = "434438117937-9rbl21us2rtldpb8pongssf4g6oflrjj.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google";

type Params = {
  clientId: string;
  clientSecret: string;
};

const googleApi = ky.create({
  prefixUrl: "https://oauth2.googleapis.com",
});

const createGoogleClient = ({ clientId, clientSecret }: Params) => {
  const googleClient = {
    getUserInfo: async (code: string) => {
      const response = await googleApi.post("token", {
        searchParams: {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
      });
      const data = GetAccessTokenResponse.parse(await response.json());

      return IdTokenClaims.parse(jose.decodeJwt(data.id_token));
    },
  };

  return { googleClient };
};

export const { googleClient } = createGoogleClient({
  clientId: CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
});

const createGoogleSignInUrl = () => {
  const url = new URL(GOOGLE_AUTH_URL);

  const params = {
    response_type: "code",
    scope: "openid email profile",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  };

  url.search = new URLSearchParams(params).toString();

  return url.toString();
};

export const googleSignInUrl = createGoogleSignInUrl();

export const GoogleCallbackSearchParams = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

const GetAccessTokenResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  token_type: z.string(),
  id_token: z.string(),
});

const IdTokenClaims = z.object({
  sub: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  name: z.string(),
  picture: z.string(),
  given_name: z.string(),
});
