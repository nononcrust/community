import { SocialSignupRequestBody } from "@/server/routes/auth";
import { Provider } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { api } from "./shared";

export type ProviderInfo = {
  provider: Provider;
  providerId: string;
  name: string;
  email: string;
};

export const authApi = {
  socialSignup: async (body: SocialSignupRequestBody) => {
    return api.auth.signup.social.$post({
      json: body,
    });
  },
  logout: async () => {
    return api.auth.logout.$post();
  },
};

export const useSocialSignup = () => {
  return useMutation({
    mutationFn: authApi.socialSignup,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};
