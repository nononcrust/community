import { ROUTE } from "./route";

export const menu = [
  { title: "커뮤니티", href: ROUTE.POST.LIST },
  { title: "마이페이지", href: ROUTE.MYPAGE },
  { title: "로그인", href: ROUTE.AUTH.LOGIN },
] as const;
