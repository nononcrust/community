"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { ROUTE } from "@/configs/route";
import { ProviderInfo, useSocialSignup } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const signupFormSchema = z.object({
  email: z.string().email(),
  nickname: z
    .string()
    .min(2, { message: "닉네임은 2~20자 사이로 입력해주세요." })
    .max(20, { message: "닉네임은 2~20자 사이로 입력해주세요." }),
  age: z.boolean().refine((value) => value === true),
  service: z.boolean().refine((value) => value === true),
  privacy: z.boolean().refine((value) => value === true),
  marketing: z.boolean(),
  sms: z.boolean(),
});

type SignupFormProps = {
  providerInfo: ProviderInfo;
};

export const SignupForm = ({ providerInfo }: SignupFormProps) => {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: providerInfo.email,
      nickname: providerInfo.name,
      age: false,
      service: false,
      privacy: false,
      marketing: false,
      sms: false,
    },
  });

  const terms = ["age", "service", "privacy", "marketing", "sms"] as const;

  const watchTerms = form.watch(terms);
  const isAllChecked = watchTerms.every((term) => term === true);

  const termsError =
    !!form.formState.errors.age ||
    !!form.formState.errors.service ||
    !!form.formState.errors.privacy;

  const toggleAllChecked = () => {
    if (isAllChecked) {
      terms.forEach((term) => {
        form.setValue(term, false, {
          shouldValidate: form.formState.isSubmitted,
        });
      });
    }

    if (!isAllChecked) {
      terms.forEach((term) => {
        form.setValue(term, true, {
          shouldValidate: form.formState.isSubmitted,
        });
      });
    }
  };

  const { mutate: signUp } = useSocialSignup();

  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    signUp(
      {
        email: data.email,
        nickname: data.nickname,
        provider: providerInfo.provider,
        providerId: providerInfo.providerId,
      },
      {
        onSuccess: () => {
          router.replace(ROUTE.HOME);
        },
      },
    );
  });

  return (
    <main className="mt-32">
      <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend className="mb-3 font-semibold">기본 정보 입력</legend>
          <Form.Item error={!!form.formState.errors.email}>
            <Form.Label>이메일</Form.Label>
            <Form.Control>
              <Input
                placeholder="이메일을 입력해주세요"
                readOnly={!!providerInfo}
                {...form.register("email")}
              />
            </Form.Control>
            <Form.ErrorMessage>{form.formState.errors.email?.message}</Form.ErrorMessage>
          </Form.Item>
          <Form.Item className="mt-4" error={!!form.formState.errors.nickname}>
            <Form.Label>닉네임</Form.Label>
            <Form.Control>
              <Input placeholder="닉네임을 입력해주세요" {...form.register("nickname")} />
            </Form.Control>
            <Form.Description>다른 유저와 겹치지 않도록 입력해주세요. (2~20자)</Form.Description>
            <Form.ErrorMessage>{form.formState.errors.nickname?.message}</Form.ErrorMessage>
          </Form.Item>
        </fieldset>
        <fieldset className="mt-8 flex flex-col gap-1.5">
          <legend className="mb-3 font-semibold">이용약관 동의</legend>
          <label className="flex items-center gap-2">
            <Checkbox checked={isAllChecked} onChange={toggleAllChecked} />
            <span className="flex items-center text-[15px] font-semibold">
              모든 이용약관 동의
              <span className="text-sub ml-2 text-[13px] font-medium">
                선택 약관에 대한 동의 포함
              </span>
            </span>
          </label>
          <div className="mt-3 flex items-center justify-between">
            <Form.Item error={!!form.formState.errors.age}>
              <label className="flex items-center gap-2">
                <Controller
                  name="age"
                  control={form.control}
                  render={({ field }) => (
                    <Form.Control>
                      <Checkbox checked={field.value} onChange={field.onChange} ref={field.ref} />
                    </Form.Control>
                  )}
                />
                <span className="flex items-center text-[15px]">
                  만 14세 이상입니다
                  <span className="text-primary ml-2 text-[13px]">(필수)</span>
                </span>
              </label>
            </Form.Item>
            <IconButton aria-label="약관 보기" size="xsmall" variant="ghost">
              <ChevronRightIcon size={16} />
            </IconButton>
          </div>
          <div className="flex items-center justify-between">
            <Form.Item error={!!form.formState.errors.service}>
              <label className="flex items-center gap-2">
                <Controller
                  name="service"
                  control={form.control}
                  render={({ field }) => (
                    <Form.Control>
                      <Checkbox checked={field.value} onChange={field.onChange} ref={field.ref} />
                    </Form.Control>
                  )}
                />
                <span className="flex items-center text-[15px]">
                  서비스 이용약관에 동의
                  <span className="text-primary ml-2 text-[13px]">(필수)</span>
                </span>
              </label>
            </Form.Item>
            <IconButton aria-label="약관 보기" size="xsmall" variant="ghost">
              <ChevronRightIcon size={16} />
            </IconButton>
          </div>
          <div className="flex items-center justify-between">
            <Form.Item error={!!form.formState.errors.privacy}>
              <label className="flex items-center gap-2">
                <Controller
                  name="privacy"
                  control={form.control}
                  render={({ field }) => (
                    <Form.Control>
                      <Checkbox checked={field.value} onChange={field.onChange} ref={field.ref} />
                    </Form.Control>
                  )}
                />
                <span className="text-[15px]">
                  개인정보 수집 및 이용 동의
                  <span className="text-primary ml-2 text-[13px]">(필수)</span>
                </span>
              </label>
            </Form.Item>
            <IconButton aria-label="약관 보기" size="xsmall" variant="ghost">
              <ChevronRightIcon size={16} />
            </IconButton>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <Controller
                name="marketing"
                control={form.control}
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={field.onChange} ref={field.ref} />
                )}
              />
              <span className="text-[15px]">
                개인정보 마케팅 활용 동의
                <span className="text-sub ml-2 text-[13px]">(선택)</span>
              </span>
            </label>
            <IconButton aria-label="약관 보기" size="xsmall" variant="ghost">
              <ChevronRightIcon size={16} />
            </IconButton>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <Controller
                name="sms"
                control={form.control}
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={field.onChange} ref={field.ref} />
                )}
              />
              <span className="text-[15px]">
                이벤트, 홍보 알림 메일 및 SMS 등 수신
                <span className="text-sub ml-2 text-[13px]">(선택)</span>
              </span>
            </label>
            <IconButton aria-label="약관 보기" size="xsmall" variant="ghost">
              <ChevronRightIcon size={16} />
            </IconButton>
          </div>
          {termsError && (
            <span className="text-error text-[13px] font-medium">모든 약관에 동의해주세요.</span>
          )}
        </fieldset>
        <Button size="large" className="mt-6 w-full" type="submit">
          가입하기
        </Button>
      </form>
    </main>
  );
};
