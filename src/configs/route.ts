export const ROUTE = {
  HOME: "/",
  POST: {
    LIST: "/posts",
    DETAIL: "/posts/:id",
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
} as const;
