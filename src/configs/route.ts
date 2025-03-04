export const ROUTE = {
  HOME: "/",
  POST: {
    LIST: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
    WRITE: "/posts/write",
    EDIT: (id: string) => `/posts/${id}/edit`,
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: {
      EMAIL: "/signup/email",
      SOCIAL: "/signup/social",
    },
    FORGOT_PASSWORD: "/forgot-password",
    SAME_EMAIL: "/same-email",
  },
  MYPAGE: "/mypage",
} as const;
