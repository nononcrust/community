export const ROUTE = {
  HOME: "/",
  POST: {
    LIST: "/posts",
    DETAIL: (id: string) => `/posts/${id}`,
    CREATE: "/posts/write",
  },
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
  MYPAGE: "/mypage",
} as const;
