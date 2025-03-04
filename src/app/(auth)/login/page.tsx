"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Form } from "@/components/ui/form";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ROUTE } from "@/configs/route";
import { googleSignInUrl } from "@/services/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().nonempty({ message: "이메일을 입력해주세요." }),
  password: z.string().nonempty({ message: "비밀번호를 입력해주세요." }),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="w-full px-4 md:mx-auto md:max-w-sm">
      <main className="mt-40 w-full">
        <Form onSubmit={onSubmit}>
          <Form.Item error={!!form.formState.errors.email}>
            <Form.Label>이메일</Form.Label>
            <Form.Control>
              <Input
                className="h-10"
                placeholder="이메일을 입력해주세요"
                {...form.register("email")}
              />
            </Form.Control>
            <Form.ErrorMessage>{form.formState.errors.email?.message}</Form.ErrorMessage>
          </Form.Item>
          <Form.Item className="mt-4" error={!!form.formState.errors.password}>
            <Form.Label>비밀번호</Form.Label>
            <div className="relative">
              <Form.Control>
                <Input
                  className="h-10 pr-8"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...form.register("password")}
                />
              </Form.Control>
              <IconButton
                aria-label="비밀번호 표시"
                size="xsmall"
                variant="ghost"
                className="text-subtle absolute top-1/2 right-1 -translate-y-1/2"
              >
                <EyeOffIcon size={14} />
              </IconButton>
            </div>
            <Form.ErrorMessage>{form.formState.errors.password?.message}</Form.ErrorMessage>
          </Form.Item>
          <div className="mt-3 flex justify-between">
            <Label className="flex items-center gap-2">
              <Checkbox />
              <span className="text-subtle text-[14px] font-medium">자동 로그인</span>
            </Label>
            <Label className="flex items-center gap-2">
              <span className="text-subtle text-[14px] font-medium">아이피 보안</span>
              <Switch size="small" />
            </Label>
          </div>
          <Button className="mt-8 w-full" type="submit" size="large">
            로그인
          </Button>
          <div className="relative my-5">
            <Divider />
            <span className="text-subtle bg-background absolute -top-2 left-1/2 -translate-x-1/2 transform px-1 text-[13px] font-medium">
              혹은
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <Link
              className="border-border flex size-10 items-center justify-center rounded-full border"
              type="button"
              href={googleSignInUrl}
            >
              <GoogleLogo />
            </Link>
            <button
              className="flex size-10 items-center justify-center rounded-full bg-[#F7DD07]"
              type="button"
            >
              <KakaoLogo />
            </button>
          </div>
          <div className="mt-3 flex flex-col items-center gap-1">
            <span className="text-subtle text-[14px] font-medium">
              비밀번호를 잊으셨나요?
              <Link href="#" className="text-sub ml-2 underline">
                비밀번호 찾기
              </Link>
            </span>
            <span className="text-subtle text-[14px] font-medium">
              아직 회원이 아니신가요?
              <Link href={ROUTE.AUTH.SIGNUP.EMAIL} className="text-sub ml-2 underline">
                회원가입
              </Link>
            </span>
          </div>
        </Form>
      </main>
    </div>
  );
}

const GoogleLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
};

const KakaoLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36" fill="none">
      <path
        opacity="0.902"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 1.888C8.58 1.888 0 9.46 0 15.866C0 20.666 3.116 24.9 7.862 27.416L5.866 34.748C5.688 35.398 6.426 35.914 6.992 35.54L15.746 29.73C16.484 29.802 17.236 29.844 18 29.844C27.94 29.844 36 23.586 36 15.866C36 9.46 27.94 1.888 18 1.888Z"
        fill="black"
      />
    </svg>
  );
};
