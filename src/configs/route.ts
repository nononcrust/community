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
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
  },
  MYPAGE: "/mypage",
} as const;
